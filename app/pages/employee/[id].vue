<template>

  <div class="p-6 flex flex-col gap-8 bg-gray-50 min-h-screen" v-if="employee">

      <h1 class="text-2xl font-bold mb-2">
 Información general de {{employee.name}}
     
    </h1>
   <CardComponent class="w-full p-6 rounded-2xl shadow-lg bg-gradient-to-r from-red-50 via-white to-red-100 backdrop-blur mb-4">
    <p class="text-gray-700 leading-relaxed text-xl">
     Este es el Perfil Ejecutivo Integral de <strong>{{ employee.name }}</strong>. Navega por las diferentes secciones para obtener una vista completa de su información laboral, métricas de desempeño clave y su estado operativo actual dentro de la organización.
    </p>
  </CardComponent>
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white shadow-lg rounded-xl transition-all duration-500 hover:shadow-xl">
      <div class="flex items-center gap-4">
        <div class="relative group">
            <img :src="employee.avatar" class="w-28 h-28 rounded-full object-cover ring-4 ring-primary-500/50 group-hover:ring-primary-600/70 transition-all duration-300 transform group-hover:scale-105" :alt="employee.name" />
            <span :class="['absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white', employee.isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500']" :title="employee.isConnected ? 'Conectado' : 'Desconectado'"></span>
        </div>

        <div class="flex flex-col">
          <h1 class="text-3xl font-extrabold text-gray-900 animate-fadein">{{ employee.name }}</h1>
          <p class="text-xl text-primary-600 font-medium">{{ employee.position }}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <Tag :value="employee.department" severity="info" rounded class="animate-tag-fade" />
            <Tag :value="employee.contractType" severity="secondary" rounded class="animate-tag-fade" />
            <Tag
              :value="employee.isActive ? 'Activo' : 'Inactivo'"
              :severity="employee.isActive ? 'success' : 'danger'"
              icon="pi pi-check"
              rounded
              class="animate-tag-fade"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-4 md:mt-0">
        <Button
          label="Reunión Google Meet"
          icon="pi pi-video"
          severity="info"
          class="p-button-outlined p-button-lg animate-button-pop"
          @click="openGoogleMeet"
        />
        <Button
          label="Contactar por Email"
          icon="pi pi-envelope"
          severity="secondary"
          class="p-button-outlined p-button-lg animate-button-pop"
          @click="openEmail"
        />
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="lg:col-span-2 flex flex-col gap-6">

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card class="metric-card shadow-md hover:shadow-xl transition-all duration-300">
            <template #content>
              <i class="pi pi-briefcase text-2xl text-blue-500 mb-2"></i>
              <p class="text-sm text-gray-500">Proyectos</p>
              <h3 class="text-2xl font-bold text-gray-800">{{ employee.projectsCompleted }}</h3>
            </template>
          </Card>
          <Card class="metric-card shadow-md hover:shadow-xl transition-all duration-300">
        <template #content>
  <i class="pi pi-dollar text-2xl text-green-500 mb-2"></i>
  <p class="text-sm text-gray-500">Salario (Mensual)</p>
  <h3 class="text-xl font-bold text-gray-800">
    ${{ (employee.salary / 12).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
  </h3>
</template>

          </Card>
          <Card class="metric-card shadow-md hover:shadow-xl transition-all duration-300">
            <template #content>
              <i class="pi pi-calendar-times text-2xl text-red-500 mb-2"></i>
              <p class="text-sm text-gray-500">Ausencias</p>
              <h3 class="text-2xl font-bold text-gray-800">{{ employee.absences }}</h3>
            </template>
          </Card>
          <Card class="metric-card shadow-md hover:shadow-xl transition-all duration-300">
            <template #content>
              <i class="pi pi-clock text-2xl text-yellow-500 mb-2"></i>
              <p class="text-sm text-gray-500">Hrs. Mes</p>
              <h3 class="text-2xl font-bold text-gray-800">{{ employee.hoursWorkedMonth }}</h3>
            </template>
          </Card>
        </div>
        
        <Card class="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
          <template #title>Detalles Laborales y Personales</template>
          <template #content>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div class="data-item"><strong>Manager:</strong> <Tag :value="employee.manager" severity="help" class="ml-1" /></div>
              <div class="data-item"><strong>Salario Anual:</strong> <span class="text-green-600 font-semibold">${{ employee.salary.toLocaleString('es-AR') }}</span></div>
              <div class="data-item"><strong>Fecha de Ingreso:</strong> {{ formatDate(employee.hiringDate) }}</div>
              <div class="data-item"><strong>Oficina:</strong> {{ employee.office }}</div>
              <div class="data-item"><strong>Modalidad:</strong> <Tag :value="employee.remote ? 'Remoto' : 'Presencial'" :severity="employee.remote ? 'warning' : 'info'" class="ml-1" /></div>
              <div class="data-item"><strong>Dirección:</strong> {{ employee.address }}</div>
              <div class="data-item"><strong>Ciudad:</strong> {{ employee.city }}</div>
              <div class="data-item"><strong>País:</strong> {{ employee.country }}</div>
            </div>
          </template>
        </Card>

        <Card class="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
          <template #title>Resumen de Desempeño</template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div class="flex flex-col items-center">
                <Knob 
                    :value="employee.performanceScore" 
                    :size="150" 
                    :valueColor="getPerformanceColor(employee.performanceScore)" 
                    rangeColor="#e0e0e0" 
                    :strokeWidth="10"
                    class="animate-knob-draw"
                />
                <p class="mt-3 text-lg font-semibold">Puntaje General</p>
                <p class="text-sm text-gray-500">Última evaluación: {{ formatDate(employee.lastEvaluation) }}</p>
              </div>
              
              <div>
                <div class="mb-4">
                  <span class="font-medium text-gray-700">Proyectos Completados (Meta: 15)</span>
                  <ProgressBar :value="(employee.projectsCompleted / 15) * 100" showValue class="mt-1" />
                </div>
                 <div class="mb-4">
                  <span class="font-medium text-gray-700">Días de Vacaciones Usados (Total: 20)</span>
                  <ProgressBar :value="(employee.vacationDaysUsed / 20) * 100" showValue class="mt-1" severity="warning" />
                </div>
                 <div class="mb-4">
                  <span class="font-medium text-gray-700">Índice de Asistencia (Meta: 98%)</span>
                  <ProgressBar :value="(100 - (employee.absences * 2))" showValue class="mt-1" :severity="(100 - (employee.absences * 2)) < 90 ? 'danger' : 'success'" />
                </div>
              </div>
            </div>
          </template>
        </Card>

      </div>

      <div class="lg:col-span-1 flex flex-col gap-6">

        <Card class="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
          <template #title>Estado y Conexión</template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div class="status-item">
                <i :class="['pi text-3xl transition-colors duration-300', employee.isConnected ? 'pi-circle-fill text-green-500' : 'pi-circle-off text-red-500']"></i>
                <span class="font-semibold">{{ employee.isConnected ? 'Conectado Ahora' : 'Desconectado' }}</span>
              </div>
              <div class="status-item">
                <i :class="['pi pi-briefcase text-3xl transition-colors duration-300', employee.inVacations ? 'text-yellow-500' : 'text-blue-500']"></i>
                <span class="font-semibold">{{ employee.inVacations ? 'En Vacaciones' : 'En Funciones' }}</span>
              </div>
              <div class="status-item">
                <i class="pi pi-clock text-3xl text-gray-600"></i>
                <span class="font-semibold">Último Login:</span>
                <span class="text-sm text-gray-500">{{ formatDateTime(employee.lastLogin) }}</span>
              </div>
            </div>
          </template>
        </Card>

        <Card class="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
          <template #title>Ubicación Geográfica</template>
          <template #content>
            <div class="text-gray-700 mb-4 text-sm">
              <p>📍 {{ employee.city }}, {{ employee.country }}</p>
            </div>
            <div ref="mapContainer" class="map-container rounded-xl shadow-inner transition-shadow duration-300"></div>
          </template>
        </Card>

      </div>
    </div>

    <div class="flex justify-start mt-6 p-4">
      <Button 
        label="Volver al Listado de Empleados" 
        icon="pi pi-arrow-left" 
        class="p-button-secondary p-button-text hover:bg-gray-200 transition-colors duration-300" 
        @click="navigateTo('/employees')" 
      />
    </div>

  </div>

  <div v-else class="p-10 text-center bg-white shadow-lg rounded-xl max-w-md mx-auto mt-20">
    <i class="pi pi-exclamation-triangle text-5xl text-yellow-500 mb-4 animate-bounce"></i>
    <p class="text-xl font-semibold text-gray-700">¡Ups! No se encontró el empleado solicitado.</p>
    <Button label="Volver" icon="pi pi-arrow-left" class="mt-6 p-button-primary" @click="navigateTo('/employees')" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, navigateTo } from '#app'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Knob from 'primevue/knob';
import CardComponent from '../../components/Card.vue';
import employees from '~/public/mocks/employees.json' 

const route = useRoute()
const employee = ref(null)
const mapContainer = ref(null)

const loadEmployee = () => {
  const id = Number(route.params.id)
  employee.value = employees.find(e => e.id === id) || null
}

// Formatos
const formatDate = dateStr =>
  new Date(dateStr).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

const formatDateTime = dateStr =>
  new Date(dateStr).toLocaleString('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })

// Lógica de colores para el Knob
const getPerformanceColor = (score) => {
    if (score >= 90) return '#10B981'; // green-500
    if (score >= 70) return '#F59E0B'; // amber-500
    return '#EF4444'; // red-500
}

// Inicializar mapa
onMounted(async () => {
  if (process.server) return

  loadEmployee()
  if (!employee.value) return

  await nextTick()

  if (!mapContainer.value) {
    console.warn('Contenedor del mapa no encontrado')
    return
  }

  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxleGdvdW1heiIsImEiOiJjbWVyMG5jMXYwMWpsMmpzYXhpdDhkazU1In0.7hpxix4FtGd2uk03XuADlg'

  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/light-v10', // Estilo más moderno
    center: [employee.value.longitude, employee.value.latitude],
    zoom: 15
  })

  // Marcador animado/mejorado
  const marker = new mapboxgl.Marker({ color: '#2563EB' }) // blue-600
    .setLngLat([employee.value.longitude, employee.value.latitude])
    .setPopup(
      new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
        <div style="font-size:14px; padding: 5px; font-weight: 600;">
          ${employee.value.name}
        </div>
      `)
    )
    .addTo(map)

  // Efecto de apertura de popup al cargar
  setTimeout(() => marker.togglePopup(), 500) 

  map.addControl(new mapboxgl.NavigationControl())
})

const openGoogleMeet = () => {
  const meetUrl = 'https://meet.google.com/abc-defg-hij'
  window.open(meetUrl, '_blank')
}

const openEmail = () => {
    // Asume que el objeto employee tiene un campo `email`
    const email = employee.value.email || 'empleado@dominio.com' 
    window.location.href = `mailto:${email}`
}
</script>


<style scoped>
/* Estilos Base */
.map-container {
  width: 100%;
  height: 20rem;
  border-radius: 1rem;
}

/* Estilos para Tarjetas de Métrica */
.metric-card :deep(.p-card-content) {
    padding: 1rem !important;
    text-align: center;
}
.status-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #e0e0e0;
}
.status-item:last-child {
    border-bottom: none;
}
.data-item {
    padding: 0.25rem 0;
}


/* Animaciones (Requieren configuración en Tailwind o SCSS/CSS) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadein {
  animation: fadeIn 0.5s ease-out;
}
.animate-tag-fade {
    animation: fadeIn 0.7s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
    animation: slideUp 0.6s ease-out;
    animation-delay: 0.2s;
    animation-fill-mode: both;
}

@keyframes pop {
    0% { transform: scale(0.9); opacity: 0; }
    80% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
}
.animate-button-pop {
    animation: pop 0.4s ease-out;
    animation-delay: 0.4s;
    animation-fill-mode: both;
}

</style>