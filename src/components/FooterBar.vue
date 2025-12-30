<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
    <footer class="w-full border-t border-gray-200 bg-white mt-16">
        <div class="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

            <p class="text-sm text-gray-500">
                © {{ year }} WhereDidMyMoneyGo. Todos os direitos reservados.
            </p>

            <div class="flex items-center gap-4 text-sm">
                <a href="#" class="text-gray-500 hover:text-gray-800 transition">
                    Termos
                </a>
                <a href="#" class="text-gray-500 hover:text-gray-800 transition">
                    Privacidade
                </a>
                <a href="https://github.com/jdiassdev/where-did-my-money-go-front" target="_blank"
                    class="text-gray-500 hover:text-gray-800 transition">
                    GitHub
                </a>
            </div>

        </div>
    </footer>
</template>
