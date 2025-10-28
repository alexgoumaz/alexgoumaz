<template>
  <div class="p-m-4 gamification-dashboard competition-theme">
    <h1 class="text-2xl font-bold mb-4">
 
      Gamificación
     
    </h1>

<CardHeader class="w-full p-6 rounded-2xl shadow-lg bg-gradient-to-r from-red-50 via-white to-red-100 backdrop-blur mb-4">
  <p class="text-gray-700 leading-relaxed text-xl">
    En esta vista podrás explorar la clasificación de empleados dentro del sistema de gamificación.
    Descubre quién lidera los rankings, revisa el progreso de tus compañeros y analiza los niveles alcanzados.
  </p>
</CardHeader>


    <section class="p-mb-6">
      <h2 class="p-text-center p-mb-5 sub-header-modern">
        <i class="pi pi-crown p-mr-2"></i>
        Top 3 Vencedores
      </h2>

      <div class="modern-podium">
        <div class="podium-slot second">
          <div class="podium-circle silver">
            <img :src="rankedEmployees[1].avatar" class="podium-avatar" />
          </div>
          <div class="podium-info">
            <h3>{{ rankedEmployees[1].name }}</h3>
            <p>{{ rankedEmployees[1].position }}</p>
            <Tag :value="`${rankedEmployees[1].points} pts`" severity="warning" icon="pi pi-star-fill" />
          </div>
          <div class="podium-base silver-base">#2</div>
        </div>

        <div class="podium-slot first">
          <div class="podium-circle gold">
            <i class="pi pi-crown podium-crown"></i>
            <img :src="rankedEmployees[0].avatar" class="podium-avatar main" />
          </div>
          <div class="podium-info">
            <h2>{{ rankedEmployees[0].name }}</h2>
            <p>{{ rankedEmployees[0].position }}</p>
            <Tag :value="`${rankedEmployees[0].points} pts`" severity="success" icon="pi pi-bolt" />
          </div>
          <div class="podium-base gold-base">#1</div>
        </div>

        <div class="podium-slot third">
          <div class="podium-circle bronze">
            <img :src="rankedEmployees[2].avatar" class="podium-avatar" />
          </div>
          <div class="podium-info">
            <h3>{{ rankedEmployees[2].name }}</h3>
            <p>{{ rankedEmployees[2].position }}</p>
            <Tag :value="`${rankedEmployees[2].points} pts`" severity="info" icon="pi pi-star-fill" />
          </div>
          <div class="podium-base bronze-base">#3</div>
        </div>
      </div>
    </section>

    <section class="p-mb-6 ranking-section-modern">
      <h2 class="p-text-center p-mb-5 sub-header-modern">
        <i class="pi pi-list-check p-mr-2"></i>
        Ranking General
      </h2>

      <transition-group name="list-fade" tag="div" class="ranking-container-modern">
        <div 
          v-for="(employee, index) in remainingEmployees" 
          :key="employee.id"
          :class="['ranking-card-v2', 'p-shadow-3', { 'ranking-card-current-user': employee.isCurrentUser }]"
        >
          <div class="ranking-left-v2">
            <div class="rank-badge">
              <span class="rank-number-v2">#{{ index + 4 }}</span>
            </div>
            
            <img :src="employee.avatar" :alt="employee.name" class="ranking-avatar-v2" />
            
            <div class="ranking-info-v2">
              <h3 class="ranking-name-v2">{{ employee.name }}</h3>
              <p class="ranking-role-v2">{{ employee.position }}</p>
            </div>
          </div>

          <div class="ranking-right-v2">
            
            <div class="progress-block">
              <div class="points-row-v2">
                <Tag 
                  :value="`Nv. ${employee.level}`" 
                  :severity="employee.isCurrentUser ? 'success' : 'info'" 
                  class="level-tag-v2" 
                  icon="pi pi-chart-line"
                />
                <span class="points-value-v2">{{ employee.points }} pts</span>
              </div>
              
              <div class="progress-bar-v2">
                <div 
                  class="progress-fill-v2" 
                  :style="{ width: getProgressPercentage(employee.points) }"
                ></div>
              </div>
              
              <div class="tasks-completed-v2">
                <i class="pi pi-check-circle p-mr-2"></i>
                <span class="p-text-bold">{{ employee.tasksCompleted }}</span> tareas completadas
              </div>
            </div>
            
            <div v-if="employee.isCurrentUser" class="current-user-indicator p-ml-4">
                <i class="pi pi-user-plus" style="font-size: 1.5rem; color: var(--green-500);"></i>
            </div>
          </div>
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Tag from "primevue/tag";
import employeesData from "../public/mocks/gamification.json"; 
import CardHeader from '../components/Card.vue';
const maxPoints = computed(() => {
    if (remainingEmployees.value.length > 0) {
        return remainingEmployees.value.reduce((max, emp) => Math.max(max, emp.points), 0);
    }
   
    return rankedEmployees.value.length > 0 ? rankedEmployees.value[2].points : 1000;
});

const getProgressPercentage = (points) => {
    const max = maxPoints.value;
    if (max === 0) return '0%';
    const percentage = (points / max) * 100;
    return `${Math.min(100, percentage)}%`; 
};


const sortedEmployees = computed(() => {
  const sorted = [...employeesData].sort((a, b) => b.points - a.points);
  return sorted.map(emp => ({
    ...emp,
    isCurrentUser: emp.id === 5 
  }));
});

const rankedEmployees = computed(() => sortedEmployees.value.slice(0, 3));
const remainingEmployees = computed(() => sortedEmployees.value.slice(3));

</script>

<style scoped>
.competition-theme {
  background: #f4f6f9;
  padding: 2rem;
}

.dashboard-title-comp {
  color: var(--blue-700);
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.competition-intro {
  background: var(--surface-card);
  border-left: 5px solid var(--orange-500);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
}

.modern-podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1.5rem;
  text-align: center;
  flex-wrap: wrap;
}
.podium-slot { display: flex; flex-direction: column; align-items: center; position: relative; }
.podium-circle {
  position: relative; width: 110px; height: 110px; border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; 
  box-shadow: 0 6px 15px rgba(0,0,0,0.15); animation: float 3s ease-in-out infinite;
}
.podium-avatar { width: 80px; height: 80px; border-radius: 50%; border: 4px solid white; object-fit: cover; }
.podium-avatar.main { width: 95px; height: 95px; }
.podium-crown { position: absolute; top: -18px; font-size: 1.8rem; color: gold; text-shadow: 0 0 8px rgba(255, 215, 0, 0.6); }
.gold { background: linear-gradient(135deg, #ffce00, #ffb300); }
.silver { background: linear-gradient(135deg, #dcdcdc, #b0b0b0); }
.bronze { background: linear-gradient(135deg, #cd7f32, #b87333); }
.podium-info h3, .podium-info h2 { font-weight: 800; margin: 0.5rem 0 0.2rem; }
.podium-info p { font-size: 0.9rem; color: var(--text-color-secondary); }
.podium-base {
  width: 100px; height: 40px; border-radius: 6px 6px 0 0; margin-top: 0.8rem; 
  font-weight: 900; color: white; display: flex; align-items: center; justify-content: center;
}
.gold-base { background: linear-gradient(180deg, #ffb300, #ff9800); height: 70px; }
.silver-base { background: linear-gradient(180deg, #c0c0c0, #9e9e9e); height: 55px; }
.bronze-base { background: linear-gradient(180deg, #cd7f32, #a65e2e); height: 45px; }

.ranking-section-modern {
  background: var(--surface-card);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-2);
}

.ranking-container-modern {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ranking-card-v2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--surface-0);
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.ranking-card-v2:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-4);
}

.ranking-card-current-user {
  border: 2px solid var(--green-500);
  background-color: var(--green-50);
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  position: relative;
  animation: pulse-border 1.5s infinite alternate;
}


@keyframes pulse-border {
  0% { border-color: var(--green-500); }
  100% { border-color: var(--green-300); }
}

.ranking-left-v2 {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rank-badge {
  width: 35px;
  height: 35px;
  min-width: 35px;
  background-color: var(--blue-500);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rank-number-v2 {
  color: white;
  font-weight: 800;
  font-size: 1rem;
}

.ranking-avatar-v2 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--surface-border);
  flex-shrink: 0;
}

.ranking-info-v2 {
  display: flex;
  flex-direction: column;
}

.ranking-name-v2 {
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  font-size: 1.1rem;
}

.ranking-role-v2 {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  margin: 0;
}


.ranking-right-v2 {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.progress-block {
  width: 250px;
}

.points-row-v2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.points-value-v2 {
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--primary-color);
}


.progress-bar-v2 {
  height: 8px;
  background-color: var(--surface-300);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill-v2 {
  height: 100%;
  background: linear-gradient(to right, var(--blue-400), var(--blue-600));
  border-radius: 4px;

  transition: width 0.7s ease-out;
}

.tasks-completed-v2 {
  font-size: 0.8rem;
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
}


.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.5s ease;
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-fade-move {

  transition: transform 0.6s ease;
}



@media (max-width: 992px) {
  .ranking-card-v2 {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .ranking-right-v2 {
    width: 100%;
    justify-content: space-between;
    padding-left: 3rem;
  }
  .progress-block {
    width: 100%;
  }
  .current-user-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

@media (max-width: 768px) {
  .modern-podium {
    flex-direction: column;
    align-items: center;
  }
  .podium-base {
    width: 80%;
  }
}
</style>