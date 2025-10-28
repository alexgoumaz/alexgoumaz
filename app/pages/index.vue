<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-8 space-y-10">
       <Card class="w-full p-6 rounded-2xl shadow-lg bg-gradient-to-r from-red-50 via-white to-red-100 backdrop-blur">
      <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">¿Por qué hice este proyecto?</h1>
      <p class="text-gray-700 leading-relaxed text-lg text-center max-w-3xl mx-auto">
        Realicé este proyecto con el fin de <strong> demostrar entusiasmo </strong> por formar parte de su equipo de trabajo. 
        Tengo un gran deseo de contribuir con soluciones creativas, <strong> generar valor real  </strong> a su empresa y seguir creciendo profesionalmente como desarrollador Nuxt.js y Vue.js.
      </p>
    </Card>
<Card class="w-full p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur">
  <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">Información General</h1>
  <p class="text-gray-500 text-center mb-6">{{ employee.position }} — Departamento de Tecnología</p>

  <div class="flex flex-col lg:flex-row items-center gap-6">
  
    <img :src="employee.avatar" alt="avatar" class="w-32 h-32 rounded-full shadow-md border-2 border-primary mx-auto lg:mx-0">

  
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 text-center lg:text-left">
      <p><strong>Nombre:</strong> {{ employee.name }}</p>
      <p><strong>Ubicación:</strong> {{ employee.city }}, {{ employee.country }}</p>
      <p><strong>Contrato:</strong> Tiempo completo</p>
      <p><strong>Oficina:</strong> Oficina Central</p>
      <p><strong>Cumpleaños:</strong> {{ birthdayFormatted }}</p>
      <p><strong>Última conexión:</strong> {{ lastLoginFormatted }}</p>
      <p><strong>Estado:</strong> 
        <span :class="employee.isConnected ? 'text-green-600' : 'text-red-600'">
          {{ employee.isConnected ? ' Conectado' : 'Desconectado' }}
        </span>
      </p>
    </div>
  </div>
</Card>
    <Card class="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Mensaje del empleado</h2>
      <p class="mt-4 text-gray-700 leading-relaxed text-lg">
        A través de este proyecto, quiero demostrar mi interés en formar parte del equipo, 
        aportar valor con mis conocimientos en Nuxt.js, vue 3 y desarrollo frontend, 
        y contribuir a la creación de soluciones modernas y eficientes.
      </p>
    </Card>
    <!-- KPIs -->
    <Card class="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">Métricas de desempeño</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div class="p-4 bg-green-50 rounded-xl shadow-sm">
          <p class="text-sm text-gray-500">Rendimiento promedio</p>
          <p class="text-2xl font-bold text-green-600">{{ averagePerformance }}%</p>
        </div>
        <div class="p-4 bg-blue-50 rounded-xl shadow-sm">
          <p class="text-sm text-gray-500">Proyectos completados</p>
          <p class="text-2xl font-bold text-blue-600">{{ employee.projectsCompleted }}</p>
        </div>
        <div class="p-4 bg-yellow-50 rounded-xl shadow-sm">
          <p class="text-sm text-gray-500">Días de vacaciones usados</p>
          <p class="text-2xl font-bold text-yellow-600">{{ employee.vacationDaysUsed }}</p>
        </div>
        <div class="p-4 bg-red-50 rounded-xl shadow-sm">
          <p class="text-sm text-gray-500">Ausencias</p>
          <p class="text-2xl font-bold text-red-600">{{ employee.absences }}</p>
        </div>
      </div>
    </Card>



  </div>
  
     <h2 class="text-2xl font-semibold text-gray-800 text-center mb-2 mt-6">
  Ubicación del empleado
</h2>
<div class="text-center mb-6">
  <h3 class="text-gray-600 text-lg font-medium">{{ employee.address }}</h3>
</div>
<div ref="mapContainer" class="map-container mx-auto"></div>

  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'primevue/chart'
import Card from '../components/Card.vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import alex from '../assets/css/image.png'
const employee = {
  id: 1,
  avatar: alex,
  name: 'Alex Goumaz',
  position: 'Desarrollador Frontend Nuxt/Vue.js',
  department: 'Tecnología',
  address: 'Av. Jorge Newbwery 323, Ezeiza, Bs. As. Argentina',
  city: 'Buenos Aires',
  country: 'Argentina',
  latitude: -34.7880852,
  longitude: -58.5230488,
  birthday: '1996-01-05',
  lastLogin: '2025-10-23T09:45:00Z',
  isConnected: true,
  projectsCompleted: 12,
  absences: 0,
  vacationDaysUsed: 8,
  performanceScore: 87
}

const lastLoginFormatted = new Date(employee.lastLogin).toLocaleString('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short'
})
const birthdayFormatted = new Date(employee.birthday).toLocaleDateString('es-AR', {
  day: '2-digit',
  month: 'long'
})

const averagePerformance = employee.performanceScore


const barData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Rendimiento mensual (%)',
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 1,
      data: [78, 82, 85, 88, 90, 92, 95, 93, 94, 96, 98, 97]
    }
  ]
})

const barOptions = ref({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#374151', font: { size: 14, weight: 'bold' } }
    },
    tooltip: {
      callbacks: { label: ctx => `${ctx.parsed.y}% de rendimiento` }
    }
  },
  scales: {
    x: {
      ticks: { color: '#6B7280' },
      grid: { color: '#E5E7EB' }
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#6B7280' },
      grid: { color: '#E5E7EB' }
    }
  }
})


const mapContainer = ref(null)
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxleGdvdW1heiIsImEiOiJjbWVyMG5jMXYwMWpsMmpzYXhpdDhkazU1In0.7hpxix4FtGd2uk03XuADlg'

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [employee.longitude, employee.latitude],
    zoom: 14
  })

  new mapboxgl.Marker({ color: '#3B82F6' })
    .setLngLat([employee.longitude, employee.latitude])
    .setPopup(
      new mapboxgl.Popup().setHTML(`<strong>${employee.name}</strong><br>${employee.city}, ${employee.country}`)
    )
    .addTo(map)
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 25rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
