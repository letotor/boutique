<script setup lang="ts">

</script>

<template>
    <header class="px-20 d-flex  flex-row align-item-center" >
        <a href="#" class="d-flex flex-row align-items-center mr-20">
            <img src="../assets/Logo_fusee_un_peu_penchee.png" alt="logo">
            <span class="logo">DGweb</span>
        </a>
      
        <ul class = "d-flex flex-row align-items-center flex-fill">
            <li class="mr-20">
                <a href=" #">Boutique</a>
            </li>
            <li class="mr-10">
                <a href=" #">Admin</a>
            </li>
        </ul>
        <ul class = "d-flex flex-row align-items-center ">
            <li class="mr-20"><a href="#">
                Inscription
            </a></li>
            <li><a href="#">
                Connexion
            </a></li>
        </ul>
  
    </header>
</template>

<style lang ="scss" scoped>

    
    header{
        background-color: var(--primary-1);
        a {
            color:var(--text-primary-color);
            img {
                width: 20px;
                margin-right: 5px ;
            }

            .logo{
                font-weight: 700;
                font-size: 20px;
            }
        }
    }

</style>
