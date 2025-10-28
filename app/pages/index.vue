<template>
  <h1 class="text-2xl font-bold mb-4">
 
      Dashboard
     
    </h1>
  <ThemeSwitcher />
  
  <CardComponent class="w-full p-6 rounded-2xl shadow-lg bg-gradient-to-r from-red-50 via-white to-red-100 backdrop-blur mb-4">
    <p class="text-gray-700 leading-relaxed text-xl">
      Este dashboard ofrece una vista integral del estado y desempeño general de la organización, brindando acceso rápido a información actualizada y relevante.
    </p>
    
  </CardComponent>
 <h2 class="text-2xl font-semibold mt-8 mb-4">Estado Operacional Actual</h2>
  <div class="flex gap-6 justify-center mt-4 flex-wrap mb-6">
    <CardComponent title="Empleados conectados" class="w-full sm:w-1/3 lg:w-1/4 min-w-48 text-center">
      <div class="flex justify-center">
     
          <DoughnutChart :data="connectedData" :options="chartOptions" class="doughnut-chart"/>

      </div>
    </CardComponent>

    <CardComponent title="Empleados en remoto" class="w-full sm:w-1/3 lg:w-1/4 min-w-48 text-center">
      <div class="flex justify-center">
      
          <DoughnutChart :data="remoteData" :options="chartOptions" class="doughnut-chart"/>
       
      </div>
    </CardComponent>

    <CardComponent title="Empleados de vacaciones" class="w-full sm:w-1/3 lg:w-1/4 min-w-48 text-center">
      <div class="flex justify-center">
      
          <DoughnutChart :data="vacationData" :options="chartOptions" class="doughnut-chart" />
       
      </div>
    </CardComponent>
  </div>
  
  <h2 class="text-2xl font-semibold mt-8 mb-4">Métricas Clave de Desempeño</h2>
   
 
  <div class="flex gap-6 justify-center flex-wrap mb-6">
    <Card title="Desempeño Promedio" class="w-full sm:w-1/3 lg:w-1/4 min-w-48 text-center bg-green-500 text-white">
     <template #title>Desempeño Promedio de empleados</template>
      <template #content>
      <p class="text-5xl font-bold">{{ averagePerformance.toFixed(1) }}</p>
      <p class="text-sm mt-1 opacity-80">Sobre 100</p>
      </template>
    </Card>

    <Card title="Proyectos Promedio" class="w-full sm:w-1/3 lg:w-1/4 min-w-48 text-center bg-blue-500 text-white">
       <template #title>Proyectos promedio de empleados</template>
      <template #content>
      <p class="text-5xl font-bold">{{ averageProjects.toFixed(2) }}</p>
      <p class="text-sm mt-1 opacity-80">Proyectos/Empleado</p>
        </template>
    </Card>

    <CardComponent title="Eficiencia Salarial" class="w-full sm:w-1/3 lg:w-1/4 min-w-48 text-center bg-yellow-500 text-white">
     
      <p class="text-5xl font-bold">{{ salaryEfficiency.toFixed(2) }}</p>
      <p class="text-sm mt-1 opacity-80">Puntos/($10k Salario)</p>

    </CardComponent>
  </div>


 <h2 class="text-2xl font-semibold mt-8 mb-4">Rendimiento Mensual Promedios</h2>

   
     <Chart type="bar" :data="barChartData" :options="barChartOptions" class="bar-chart" />



 <h2 class="text-2xl font-semibold mt-8 mb-4">Ubicación de empleados</h2>
  <div class="mt-10 flex flex-col items-center">
   
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import DoughnutChart from '../components/DoughnutChart.vue'; 
import Chart from 'primevue/chart';

import { Chart as ChartJS } from 'chart.js';
import employees from '../public/mocks/employees.json'; 
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { navigateTo } from '#app';
import CardComponent from '../components/Card.vue';

const averagePerformance = ref(0);
const averageProjects = ref(0);
const salaryEfficiency = ref(0);


const connectedData = ref();
const remoteData = ref();
const vacationData = ref();
const chartOptions = ref(null);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, chartArea: { width, height }, options } = chart;
    ctx.save();
    const dataArray = chart.data.datasets[0].data;
    const total = dataArray.reduce((a, b) => a + b, 0);
    const firstValue = dataArray[0];
    const text = `${firstValue}/${total}`;
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';
    const fontColor = options.plugins.centerText.fontColor || '#000000';
    ctx.fillStyle = fontColor;
    const textX = Math.round((width - ctx.measureText(text).width) / 2) + chart.chartArea.left;
    const textY = height / 2 + chart.chartArea.top;
    ctx.fillText(text, textX, textY);
    ctx.restore();
  }
};


const calculateKpis = () => {
  const totalEmployees = employees.length;
  if (totalEmployees === 0) return;

  const totalPerformanceScore = employees.reduce((sum, emp) => sum + emp.performanceScore, 0);
  const totalProjectsCompleted = employees.reduce((sum, emp) => sum + emp.projectsCompleted, 0);
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  
  averagePerformance.value = totalPerformanceScore / totalEmployees;


  averageProjects.value = totalProjectsCompleted / totalEmployees;


  const averageSalary = totalSalary / totalEmployees;

  const salaryFactor = averageSalary / 10000;
  salaryEfficiency.value = salaryFactor > 0 ? averagePerformance.value / salaryFactor : 0;
};


onMounted(() => {
  ChartJS.register(centerTextPlugin);

 
  const employeesWorking = employees.filter(e => !e.inVacations);
  const totalWorking = employeesWorking.length;

  const connectedCount = employeesWorking.filter(e => e.isConnected).length;
  const disconnectedCount = totalWorking - connectedCount;
  connectedData.value = createChartData(
    [connectedCount, disconnectedCount],
    ['Conectados', 'Desconectados'],
    ['#28a745', '#dc3545']
  );

  const remoteCount = employeesWorking.filter(e => e.remote).length;
  const nonRemoteCount = totalWorking - remoteCount;
  remoteData.value = createChartData(
    [remoteCount, nonRemoteCount],
    ['Remotos', 'No Remotos'],
    ['#28a745', '#dc3545']
  );

  const vacationCount = employees.filter(e => e.inVacations).length;
  const nonVacationCount = employees.length - vacationCount;
  vacationData.value = createChartData(
    [vacationCount, nonVacationCount],
    ['De Vacaciones', 'Trabajando'],
    ['#ffc107', '#28a745'] 
  );

  chartOptions.value = createChartOptions();

  calculateKpis();


  nextTick(() => initMap());
});


const mapContainer = ref(null);
let map = null;

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleGdvdW1heiIsImEiOiJjbWVyMG5jMXYwMWpsMmpzYXhpdDhkazU1In0.7hpxix4FtGd2uk03XuADlg";

const initMap = () => {
  try {
    if (!mapContainer.value) return;

    const firstEmp = employees[0];
    const centerLat = firstEmp?.latitude ?? -34.6037;
    const centerLng = firstEmp?.longitude ?? -58.3816;

    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [centerLng, centerLat],
      zoom: 1,
    });


    map.addControl(new mapboxgl.NavigationControl());


    employees.forEach((emp) => {
      if (typeof emp.latitude === "number" && typeof emp.longitude === "number") {
        const color = emp.isConnected ? "#28a745" : "#dc3545";

        const popupContent = document.createElement('div');
        popupContent.style.fontSize = '14px';
        popupContent.innerHTML = `
          <div style="text-align:center;">
            <img src="${emp.avatar}" alt="${emp.name}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; margin-bottom:5px;" />
            <strong>${emp.name}</strong><br/>
            ${emp.position}<br/>
            <small>${emp.address}</small><br/>
        `;


        const button = document.createElement('button');
        button.textContent = 'Ver detalles';
        button.className = 'mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-center';
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          navigateTo(`/employee/${emp.id}`);
        });

        popupContent.appendChild(button);

        const marker = new mapboxgl.Marker({ color })
          .setLngLat([emp.longitude, emp.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent))
          .addTo(map);
      }
    });


    nextTick(() => map.resize());
  } catch (error) {
    console.error("Error inicializando el mapa:", error);
  }
};


const createChartData = (dataArray, labelsArray, colors) => ({
  labels: labelsArray,
  datasets: [{
    data: dataArray,
    backgroundColor: colors,
    hoverBackgroundColor: colors.map(c => lightenColor(c, 20))
  }]
});

const createChartOptions = () => ({
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: getComputedStyle(document.documentElement).getPropertyValue('--p-text-color')
      }
    },
    tooltip: { enabled: true },
    centerText: {
      fontColor: getComputedStyle(document.documentElement).getPropertyValue('--p-text-color')
    }
  }
});

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return "#" + (
    0x1000000
    + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000
    + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100
    + (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
}
const barChartData = ref({
  labels: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  datasets: [
    {
      label: 'Rendimiento Promedio',
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 1,
      data: [75, 78, 82, 80, 85, 88, 90, 87, 89, 92, 91, 94]
    }
  ]
});

const barChartOptions = ref({
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      labels: {
        color: '#374151', 
        font: { size: 14, weight: 'bold' }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.parsed.y} puntos`
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#6B7280', font: { size: 12 } },
      grid: { color: '#E5E7EB' }
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#6B7280', font: { size: 12 } },
      grid: { color: '#E5E7EB' }
    }
  }
});

</script>

<style scoped>
.map-container {
  width: 80%;
  height: 30rem;
  border-radius: 1rem;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .map-container {
    width: 100%;
    height: 24rem;
  }
}
.doughnut-chart {
  width: 12rem;
  height: 12rem;
}


:deep(canvas) {
  border-radius: 0.75rem;
  background-color: #ffffff;
  padding: 1rem;
}
.bar-chart {
  width: 90%;
  height: 30rem;
}
</style>