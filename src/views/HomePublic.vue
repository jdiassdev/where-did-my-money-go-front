<script setup lang="ts">
import CardBase from "@/components/ui/CardBase.vue";
import { useAuth } from "@/composables/use-auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { isAuthenticated } = useAuth();
</script>

<template>
    <section class="
      hero min-h-screen
      bg-[url('/img_pb.png')]
      bg-cover bg-center bg-no-repeat
    ">
        <div class="hero-overlay bg-base-100/80"></div>

        <div class="hero-content flex-col text-center gap-10 px-4">

            <h1 class="text-4xl md:text-5xl font-bold text-primary">
                WhereDidMyMoneyGo?
            </h1>

            <p class="text-base md:text-lg max-w-xl">
                Controle simples e direto dos seus gastos.
                Saiba exatamente para onde seu dinheiro está indo.
            </p>

            <div class="grid gap-6 md:grid-cols-3 max-w-5xl">

                <CardBase title="Controle suas finanças"
                    description="Veja para onde seu dinheiro está indo em segundos." />

                <CardBase title="Gaste com consciência"
                    description="Categorias automáticas e relatórios claros para decisões inteligentes." />

                <CardBase title="Acompanhe em tempo real"
                    description="Atualizações instantâneas para não ter surpresas no final do mês." />

            </div>

            <div v-if="!isAuthenticated" class="flex flex-col sm:flex-row gap-4 mt-6">
                <RouterLink to="/register" class="btn btn-primary">
                    Criar conta
                </RouterLink>

                <RouterLink to="/login" class="btn btn-outline">
                    Entrar
                </RouterLink>
            </div>

        </div>
    </section>
</template>
