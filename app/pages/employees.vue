<script setup>
import { ref, computed } from 'vue'
import { navigateTo } from '#app'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import employees from '../public/mocks/employees.json'
import Card from '../components/Card.vue';

const filters = ref({
  name: '',
  department: '',
  isActive: '',
  birthdayToday: false
})

const statusOptions = [
  { label: 'Todos', value: '' },
  { label: 'Activo', value: 'true' },
  { label: 'Inactivo', value: 'false' }
]

const isBirthdayToday = (birthdayDate) => {
  if (!birthdayDate) return false
  const today = new Date()
  const birth = new Date(birthdayDate + 'T00:00:00')
  return birth.getDate() === today.getDate() && birth.getMonth() === today.getMonth()
}

const toggleBirthdayToday = () => {
  filters.value.birthdayToday = !filters.value.birthdayToday
}

const filteredEmployees = computed(() => {
  return employees
    .filter(emp => {
      const matchesName = emp.name.toLowerCase().includes(filters.value.name.toLowerCase())
      const matchesDept = emp.department.toLowerCase().includes(filters.value.department.toLowerCase())
      const matchesActive =
        filters.value.isActive === '' ||
        (filters.value.isActive === 'true' && emp.isActive) ||
        (filters.value.isActive === 'false' && !emp.isActive)
      const matchesBirthday = !filters.value.birthdayToday || isBirthdayToday(emp.birthday)
      return matchesName && matchesDept && matchesActive && matchesBirthday
    })
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Empleados</h1>
<Card class="w-full p-6 rounded-2xl shadow-lg bg-gradient-to-r from-red-50 via-white to-red-100 backdrop-blur mb-4">
  <p class="text-gray-700 leading-relaxed text-xl">
    En esta vista puedes consultar la lista de empleados de la empresa. Utiliza los filtros para buscar por nombre, departamento, estado (activo o inactivo) o para ver quiénes cumplen años hoy.
  </p>
</Card>


    <div class="mb-4 flex flex-wrap gap-4 items-center">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <InputText v-model="filters.name" placeholder="Buscar por nombre" />
      </span>

      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <InputText v-model="filters.department" placeholder="Buscar por departamento" />
      </span>

      <Dropdown
        v-model="filters.isActive"
        :options="statusOptions"
        optionLabel="label"
        placeholder="Estado"
        class="w-40"
      />

      <Button
        :label="filters.birthdayToday ? 'Mostrar Todos' : 'Cumpleaños Hoy'"
        icon="pi pi-birthday-cake"
        class="p-button-warning"
        @click="toggleBirthdayToday"
        :class="{ 'p-button-success': filters.birthdayToday }"
      />
    </div>

   
    <DataTable :value="filteredEmployees" paginator :rows="10" tableStyle="min-width: 60rem">
            <Column header="Acciones" bodyClass="text-center">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            label="Ver"
            class="p-button-rounded p-button-info p-button-sm"
            @click="navigateTo(`/employee/${slotProps.data.id}`)"
          />
        </template>
      </Column>
      <Column header="Avatar">
        <template #body="slotProps">
          <img :src="slotProps.data.avatar" class="w-10 h-10 rounded-full object-cover" />
        </template>
      </Column>
      <Column field="name" header="Nombre" sortable />
      <Column field="department" header="Departamento" sortable />
      <Column field="email" header="Email" />
      <Column field="signingTime" header="Hora Entrada" />
      <Column field="isActive" header="Activo">
        <template #body="slotProps">
          <i
            class="pi pi-circle-fill"
            :class="slotProps.data.isActive ? 'text-green-500' : 'text-red-500'"
          ></i>
        </template>
      </Column>

      

    </DataTable>
  </div>
</template>

<style scoped>

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}
.dot-active { background-color: #10B981; }
.dot-inactive { background-color: #EF4444; }

.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }


@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
.birthday-blink {
  animation: blink 1s steps(1, end) infinite;
}

.text-xl { font-size: 1.25rem; }
.text-yellow-500 { color: #FBBF24; }
.ml-2 { margin-left: 0.5rem; }
</style>
