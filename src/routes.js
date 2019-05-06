import MovieDB from './components/MovieDB.vue';
import MovieDescription from './components/MovieDescription.vue';

const routes = [
    { path: '/', name: 'home', component: MovieDB },
    { path: '/description/:id', name: 'description', component: MovieDescription },
];

export default routes;