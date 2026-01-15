<template>
    <nav class="w-full bg-base-200 ">
        <div class="navbar max-w-7xl mx-auto px-4">
            <div class="navbar-start">
                <div class="dropdown lg:hidden">
                    <div tabindex="0" class="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul class="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        <li v-if="isAuthenticated">
                            <RouterLink to="/profile">Perfil</RouterLink>
                        </li>
                        <li v-if="isAuthenticated">
                            <RouterLink to="/transaction-menu">Transações</RouterLink>
                        </li>
                        <li v-if="isAuthenticated">
                            <RouterLink to="/dashboard">Dashboard</RouterLink>
                        </li>
                        <li class=" rounded" v-if="!isAuthenticated">
                            <RouterLink to="/register">Criar conta</RouterLink>
                        </li>
                        <li class=" rounded" v-if="!isAuthenticated">
                            <RouterLink to="/login">Entrar</RouterLink>
                        </li>

                    </ul>
                </div>
                <RouterLink to="/" class="btn btn-ghost text-xl text-primary">WhereDidMyMoneyGo ?</RouterLink>
            </div>

            <div class="navbar-center hidden lg:flex btn-ghost">
                <ul class="menu menu-horizontal px-1 gap-1">
                    <li v-if="isAuthenticated">
                        <RouterLink to="/profile">Perfil</RouterLink>
                    </li>
                    <li v-if="isAuthenticated">
                        <RouterLink to="/transaction-menu">Transações</RouterLink>
                    </li>
                    <li v-if="isAuthenticated">
                        <RouterLink to="/dashboard">Dashboard</RouterLink>
                    </li>
                    <li class=" rounded" v-if="!isAuthenticated">
                        <RouterLink to="/register">Criar conta</RouterLink>
                    </li>
                    <li class=" rounded" v-if="!isAuthenticated">
                        <RouterLink to="/login">Entrar</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="navbar-end">
                <button v-if="isAuthenticated" class="btn" @click="handleLogout">Sair</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/use-auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { isAuthenticated, logout } = useAuth();

function handleLogout() {
    logout();
    router.push("/login");
}
</script>
