<template>
    <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style scoped>
    .bouncing-loader {
        display: flex;
        justify-content: left;
        /* margin: 40px auto; */
    }

    .bouncing-loader > div {
        width: 10px;
        height: 10px;
        margin: 20px;
        border-radius: 50%;
        background-color: #a3a1a1;
        opacity: 1;
        animation: bouncing-loader 0.9s infinite alternate;
    }

    @keyframes bouncing-loader {
        to {
            opacity: 0.1;
            transform: translateY(-10px);
        }
    }

    .bouncing-loader > div:nth-child(2) {
        animation-delay: 0.2s;
    }

    .bouncing-loader > div:nth-child(3) {
        animation-delay: 0.4s;
    }
</style>