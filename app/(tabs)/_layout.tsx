import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#07111f' },
        headerTintColor: '#e8f7ff',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: '#65e4ff',
        tabBarInactiveTintColor: '#7f8ea3',
        tabBarStyle: {
          backgroundColor: '#07111f',
          borderTopColor: '#163452',
          height: 70,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Painel',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="rocket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="avisos"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="warning" color={color} />,
        }}
      />
      <Tabs.Screen
        name="missao"
        options={{
          title: 'Missao',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="sliders" color={color} />,
        }}
      />
    </Tabs>
  );
}
