<template>
    <section class="text-center space-y-10 py-20">

        <h1 class="text-4xl font-bold">
            WhereDidMyMoneyGo
        </h1>

        <p class="text-gray-600 max-w-xl mx-auto">
            Controle simples e direto dos seus gastos.
            Saiba exatamente para onde seu dinheiro está indo.
        </p>

        <div class="grid md:grid-cols-3 gap-6 mt-12">

            <div class="p-6 border rounded-lg">
                <h3 class="font-semibold mb-2">O que é?</h3>
                <p class="text-sm text-gray-500">
                    Um app pessoal para registrar e entender seus gastos.
                </p>
            </div>

            <div class="p-6 border rounded-lg">
                <h3 class="font-semibold mb-2">Para quem?</h3>
                <p class="text-sm text-gray-500">
                    Pessoas que querem parar de gastar no automático.
                </p>
            </div>

            <div class="p-6 border rounded-lg">
                <h3 class="font-semibold mb-2">Por que usar?</h3>
                <p class="text-sm text-gray-500">
                    Clareza financeira sem planilhas nem complicação.
                </p>
            </div>

        </div>

        <div class="flex justify-center gap-4 mt-10">
            <RouterLink to="/register" class="bg-green-500 text-white px-6 py-3 rounded">
                Criar conta
            </RouterLink>

            <RouterLink to="/login" class="border px-6 py-3 rounded">
                Entrar
            </RouterLink>
        </div>

    </section>
</template>
