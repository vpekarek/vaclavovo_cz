<template>
    <div class="page--content page-not-found">
        <div class="error">
            <h1>404 ERROR</h1>
            <div>
                <p>There is nothing to show.</p>
                <p>
                    <router-link to="/" class="btn light">go to homepage</router-link><br />
                    or<br />
                    <router-link to="/" class="btn secondary">read a blog</router-link><br />
                    or<br />
                    <router-link to="/about" class="btn secondary">read more about me</router-link>
                </p>
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-not-found {    
    padding-left: 10px;
    padding-right: 10px;
}

.error {
    margin-top: 20vh;
    text-align: center;

    @media screen and (max-height: 800px) {
        margin-top: 10px;
    }
}
</style>