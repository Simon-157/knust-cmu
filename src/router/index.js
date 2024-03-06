import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StudentsView from '../views/StudentsView.vue';
import CoursesView from '../views/CoursesView.vue';
import GradesView from '../views/GradesView.vue';
import InstructorsView from '../views/InstructorsView.vue';
import StudentsGradeView from '../views/StudentGrades.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        icon: 'home' 
      }
    },
    {
      path: '/dashboard',
      name: 'students',
      component: StudentsView,
      meta: {
        icon: 'user' 
      }
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
      meta: {
        icon: 'book' 
      }
    },
    {
      path: '/grades',
      name: 'grades',
      component: GradesView,
      meta: {
        icon: 'star' 
      }
    },
    {
      path: '/instructors',
      name: 'instructors',
      component: InstructorsView,
      meta: {
        icon: 'teacher' 
      }
    },
     {
      path: '/student/grades',
      name: 'students|grades',
      component: StudentsGradeView,
      meta: {
        icon: 'user' 
      }
    }
  ]
});

export default router;
