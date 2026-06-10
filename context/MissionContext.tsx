import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { defaultMission, defaultSettings, defaultTelemetry } from '../data/defaultMission';
import { MissionAlert, MissionContextValue, MissionData, MissionSettings, Telemetry } from '../types/mission';

const STORAGE_KEY = '@mission-control-state';

const MissionContext = createContext<MissionContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function makeAlert(title: string, message: string, severity: MissionAlert['severity']): MissionAlert {
  return {
    id: `${title}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title,
    message,
    severity,
    createdAt: new Date().toISOString(),
  };
}

function buildAlerts(telemetry: Telemetry, settings: MissionSettings) {
  const nextAlerts: MissionAlert[] = [];

  if (telemetry.battery <= settings.criticalBattery) {
    nextAlerts.push(
      makeAlert('Energia critica', `Bateria em ${telemetry.battery}%. Redirecione paineis solares.`, 'critical'),
    );
  } else if (telemetry.battery <= settings.criticalBattery + 12) {
    nextAlerts.push(makeAlert('Energia em queda', `Bateria em ${telemetry.battery}%.`, 'warning'));
  }

  if (telemetry.signal <= settings.criticalSignal) {
    nextAlerts.push(
      makeAlert('Comunicacao instavel', `Sinal em ${telemetry.signal}%. Ajuste a antena principal.`, 'critical'),
    );
  }

  if (telemetry.orbitalStability <= settings.criticalStability) {
    nextAlerts.push(
      makeAlert(
        'Estabilidade orbital critica',
        `Indice orbital em ${telemetry.orbitalStability}%. Execute correcao de atitude.`,
        'critical',
      ),
    );
  }

  if (telemetry.temperature >= 72) {
    nextAlerts.push(makeAlert('Temperatura elevada', `Modulo tecnico a ${telemetry.temperature} C.`, 'warning'));
  }

  if (telemetry.radiation >= 78) {
    nextAlerts.push(makeAlert('Radiacao elevada', `Radiacao em ${telemetry.radiation} mSv.`, 'critical'));
  }

  return nextAlerts;
}

export function MissionProvider({ children }: { children: ReactNode }) {
  const [telemetry, setTelemetry] = useState(defaultTelemetry);
  const [mission, setMission] = useState(defaultMission);
  const [settings, setSettings] = useState(defaultSettings);
  const [alerts, setAlerts] = useState<MissionAlert[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((rawState) => {
        if (!rawState) return;
        const parsed = JSON.parse(rawState) as Partial<{
          telemetry: Telemetry;
          mission: MissionData;
          settings: MissionSettings;
          alerts: MissionAlert[];
        }>;

        if (parsed.telemetry) setTelemetry(parsed.telemetry);
        if (parsed.mission) {
          setMission({
            ...parsed.mission,
            name: parsed.mission.name === 'Aurora IX' ? defaultMission.name : parsed.mission.name,
          });
        }
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.alerts) setAlerts(parsed.alerts.slice(0, 20));
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        telemetry,
        mission,
        settings,
        alerts: alerts.slice(0, 20),
      }),
    );
  }, [alerts, loaded, mission, settings, telemetry]);

  useEffect(() => {
    if (!settings.autoSimulation) return;

    const interval = setInterval(() => {
      setTelemetry((current) => ({
        temperature: clamp(current.temperature + Math.round(Math.random() * 8 - 3), -30, 95),
        battery: clamp(current.battery + Math.round(Math.random() * 6 - 4), 0, 100),
        signal: clamp(current.signal + Math.round(Math.random() * 10 - 5), 0, 100),
        orbitalStability: clamp(current.orbitalStability + Math.round(Math.random() * 8 - 4), 0, 100),
        oxygen: clamp(current.oxygen + Math.round(Math.random() * 5 - 3), 0, 100),
        radiation: clamp(current.radiation + Math.round(Math.random() * 8 - 3), 0, 100),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [settings.autoSimulation]);

  useEffect(() => {
    const automaticAlerts = buildAlerts(telemetry, settings);
    if (automaticAlerts.length === 0) return;

    setAlerts((current) => {
      const existingKeys = new Set(current.map((alert) => alert.title));
      const uniqueAlerts = automaticAlerts.filter((alert) => !existingKeys.has(alert.title));
      return [...uniqueAlerts, ...current].slice(0, 20);
    });
  }, [settings, telemetry]);

  const value = useMemo<MissionContextValue>(
    () => ({
      telemetry,
      mission,
      settings,
      alerts,
      updateTelemetry: setTelemetry,
      updateMission: setMission,
      updateSettings: setSettings,
      acknowledgeAlert: (id) => setAlerts((current) => current.filter((alert) => alert.id !== id)),
      resetMission: () => {
        setTelemetry(defaultTelemetry);
        setMission(defaultMission);
        setSettings(defaultSettings);
        setAlerts([]);
      },
    }),
    [alerts, mission, settings, telemetry],
  );

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMission() {
  const value = useContext(MissionContext);

  if (!value) {
    throw new Error('useMission must be used inside MissionProvider');
  }

  return value;
}
