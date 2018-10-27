<template>
  <div>
     <v-layout row>
      <v-flex xs12 sm6 offset-sm4>
        <v-card v-if="isThereUser"  justify-center style ="margin-top:60px; max-width:400px">
        <v-card-title>
          <h3 class="title dark-gray--text">Sign in</h3>
        </v-card-title>

        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Username"
                v-model="credentials.username"
                autocomplete="auto"
                prepend-icon="person">
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Password"
                v-model="credentials.password"
                prepend-icon="lock"
                type="password"
                @keyup.native.enter="signIn">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-btn block class="pink white--text" @click="signIn">Sign in</v-btn>
        </v-card-actions>
      </v-card>
      </v-flex>
    </v-layout>
  <AppWelcomeCard v-if="checkedForUser && !isThereUser"></AppWelcomeCard>
  </div>
</template>

<script>
import AppWelcomeCard from '@/components/AppWelcomeCard'
import { mapGetters } from 'vuex'

export default {
  name: 'SignInPage',

  mounted () {
    this.$store.commit('auth/checkForUser')
  },

  components: {
    AppWelcomeCard
  },

  data () {
    return {
      credentials: {
        username: 'rodrigorhas',
        password: 'summer123'
      }
    }
  },

  computed: {
    ...mapGetters('auth', [
      'user',
      'isThereUser',
      'checkedForUser'
    ])
  },

  watch: {
    user (value) {
      if (value !== null) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    signIn () {
      this.$store.dispatch('auth/signIn', this.credentials)
    }
  }
}
</script>
