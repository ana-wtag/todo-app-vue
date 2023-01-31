<template>
    <section class="container">
        <header>
            <NavBar />
        </header>
        <main>
            <Nuxt />
        </main>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    nav, .nav-right {
        display: flex;
        justify-content: space-between;
    }
</style>
