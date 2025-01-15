import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import AddProduct from '../components/AddProduct.vue'
import LoginView from '../views/LoginView.vue'
import AddProductView from '@/views/AddProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product',
      component: ProductView,
      //För att nå denna route behöver användaren vara autentiserad
      meta: { reqAuth: true }
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProductView,
      //För att nå denna route behöver användaren vara autentiserad
      meta: { reqAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})


//Innan navigeringen sker körs denna metod
router.beforeEach(async (to, from, next) => {
  if (to.meta.reqAuth) {
    try {
      //Kontrollera om användaren är autentiserad
      const resp = await fetch("https://projektfullstackramverk.onrender.com/products", {
        credentials: "include"
      })

      //Om användaren är autentiserad skickas användaren vidare till den önskade routen
      if (resp.ok) {
        next()
      } else {
        //Om användaren inte är autentiserad skickas användren till login-sidan
        next("/login")
      }
    } catch (error) {
      console.error("Fel vid inloggning:", error);
      next("/login")
    }
  } else {
    next()
  }
})

export default router
