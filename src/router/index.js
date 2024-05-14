// imports 
import { createRouter, createWebHistory } from 'vue-router';

// routes 

// teams related 
import TeamsList from './../pages/TeamsList.vue';
import TeamMembers from './../components/teams/TeamMembers.vue';
import TeamsFooter from './../pages/TeamsFooter.vue';


// user related
import UsersList from './../pages/UsersList.vue';
import UsersFooter from './../pages/UsersFooter.vue';


// catch all (Not Found)

import NotFound from './../components/nav/NotFound.vue';


// pages registration
const routes =[


    // default route config  on load we want to show some components as defalut component
    {
        path:"/",
        redirect:'/teams'
    },
    {
        path:"/teams",
        // component:TeamsList,
        components:{default :TeamsList , footer:TeamsFooter },
        name:"teams",


        // for named router in the future  if we want to change the path to different path we no need to chnage all over the places 
        // instaed we can chnage in main route file so that when we navigate it will be update with new as we changed the path.

        // alias:"/" url won't chnage when we use as defalut route 


        children :[
            {
                path:":teamid",
                component:TeamMembers,
                props:true,
                name:"team-members"
            }
        ],

        // meta can store any kind of data ,object or normal data


        meta:{needsAuth:true}
    },

    // dynamic path segments

    // conveted top leve route into nested route 
    // {
    //     path:"/teams/:teamid",
    //     component:TeamMembers,
    //     props:true // it will tell to route saying that the dynamic parameters passed as props to the component.
    // },
    
    {
        path:"/users",
        // component:UsersList
        components :{
            default:UsersList,
            footer:UsersFooter
        },
        beforeEnter(_,_2,next){
            console.log("route level beforeEnter")
            next()
        }
    },

    // notfoudnd route (catch all)

    {
        path:"/:pathMatch(.*)*",
        component:NotFound
    }
    ]

const router = createRouter({
    routes,
    history:createWebHistory(),

    // changes default class name to custom however we want
    linkActiveClass:'active',
    scrollBehavior(_,_2,savedPostions){
        // console.log(to,from,savedPostions);

        if(savedPostions){
            return savedPostions;
        }
        return {left:0,top:0}
    }
});



// router guards
// authencation should not access without login 
//  you wanna run some code thereor they can be useful to ensure that a user doesn't accidentally navigate away from a page
router.beforeEach((to,from,next) => {

    console.log("Global for each");
    console.log(to,from)
    next(); // allow navigation

    // next(false) cancel the navigation option one
    // next(string)
    // next({name:""})

    // avoid the infinite loop by writting condition 
});

router.afterEach((_,_2) => {
    // sending analytics data 
    console.log("Global after each ")
    console.log(_);
    console.log(_2)
});

export default router;