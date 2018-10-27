<template>
  <v-app id="app">
    <!-- show alerts using the snackbar -->
    <AppAlert :alert="alert" :showAlert="showAlert" @close="closeAlert"></AppAlert>
    <AppNavigationDrawer v-if="authenticated"></AppNavigationDrawer>
    <AppToolbar v-if="authenticated"></AppToolbar>

    <!-- The Main content -->
    <main>
      <v-container id="wrapping" fluid>
        <router-view></router-view>
      </v-container>
    </main>

    <!--The footer region -->
    <v-footer class="pa-3 pinkish" fixed>
      <v-spacer></v-spacer>
      <div class="pink--text">assignme v{{version}}</div>
    </v-footer>
  </v-app>
</template>

<script>
  import AppAlert from '@/components/AppAlert'
  import AppNavigationDrawer from '@/components/AppNavigationDrawer'
  import AppToolbar from '@/components/AppToolbar'
  import { mapGetters } from 'vuex'

  export default {
    name: 'assignme',

    components: { AppAlert, AppNavigationDrawer, AppToolbar },

    data () {
      return {
        version: require('../../package.json').version
      }
    },

    methods: {
      closeAlert () {
        this.$store.commit('alert/close')
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },

    computed: {
      ...mapGetters('auth', {
        authenticated: 'authenticated'
      }),
      ...mapGetters('alert', {
        alert: 'alert',
        showAlert: 'show'
      })
    }
  }
</script>

<style lang="stylus">
  /* CSS */
  @import './stylus/main'
  body { font-family: 'Ubuntu', 'Source Sans Pro', sans-serif; }
  .pinkish {
    border-top 0.2px solid pink
  }
</style>
