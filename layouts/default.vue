<template>
    <div>
        <header>
            <navbar />
        </header>
        <main>
            <Nuxt />
        </main>
    </div>
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