<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <router-link to="/users" tag="li" class="nav-item">
                            <a class="nav-link">
                                <i class="fas fa-user-friends"></i>
                                Users
                            </a>
                        </router-link>
                        <router-link to="/companies" tag="li" class="nav-item">
                            <a class="nav-link">
                                <i class="fas fa-city"></i>
                                Companies
                            </a>
                        </router-link>
                        <router-link to="/transfers" tag="li" class="nav-item">
                            <a class="nav-link">
                                <i class="fas fa-exchange-alt"></i>
                                Transfers
                            </a>
                        </router-link>
                        <router-link to="/abusers" tag="li" class="nav-item">
                            <a class="nav-link">
                                <i class="fas fa-exclamation-circle"></i>
                                Abusers
                            </a>
                        </router-link>
                    </ul>
                </div>
            </nav>
            <router-view/>
        </div>
    </div>
</template>

<style scoped>
    .router-link-active .nav-link {
        color: #007bff;
    }
</style>
