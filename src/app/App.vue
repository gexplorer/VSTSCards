<template>
<section>
    <nav class="navbar no-print is-link" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="postits.png" alt="VSTS Cards" width="28" height="28">
                VSTS Cards
            </a>
            <button class="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
            </button>
        </div>
        <div class="navbar-menu" id="navMenu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <a class="button is-danger" @click="print">
                                <span class="icon">
                                    <i class="fa fa-print" aria-hidden="true"></i>
                                </span>
                                <span>Print</span>
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-primary" @click="openConfig">
                                <span class="icon">
                                    <i class="fa fa-cog" aria-hidden="true"></i>
                                </span>
                                <span>Config</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="modal" :class="{'is-active' : config}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Config</p>
                <button class="delete" aria-label="close" @click="closeConfig"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Id</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="idIndex">
                                <option v-for="column in columns" :value="column.index">{{column.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Type</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="typeIndex">
                                <option v-for="column in columns" :value="column.index">{{column.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="titleIndex">
                                <option v-for="column in columns" :value="column.index">{{column.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Effort</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="effortIndex">
                                <option v-for="column in columns" :value="column.index">{{column.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" v-model="zoom">
                            Zoom
                        </label>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="closeConfig">Save</button>
            </footer>
        </div>
    </div>
    <section class="section">
        <div class="container">
            <span class="wrapper" v-for="card in cards" :class="{'no-print': card.hidden}" @click="toggleCard(card)">
                <div class="card" :class="{bug: card.isBug, pbi: !card.isBug}">
                    <span class="effort">{{card.effort}}</span>
                    <span class="id">{{card.id}}</span>
                    <span class="title" ref="title">{{card.title}}</span>
                </div>
            </span>
        </div>
    </section>
</section>
</template>
<script src="app.js"></script>
<style lang="scss" scoped>
@import 'app.scss';
</style>