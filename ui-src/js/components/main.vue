<template>
  <div>
    <div id="grid-container">
      <Header />
      <div id="left-bar"></div>
      <div id="navigation-content">
        <Login v-if="!userIsLoggedIn" />
        <router-view v-if="userIsLoggedIn"></router-view>
      </div>
      <div id="right-div"></div>
    </div>
    <PopupOverlay v-if="popupIsBeingShown" :content="popupContent" />
    <LoadingOverlay v-if="contentIsBeingLoaded" />
  </div>
</template>

<script>
  import getCurrentUser from '../apiCalls/users/getCurrentUser';
  import Header from './Header.vue';
  import Login from './login/Login.vue';
  import LoadingOverlay from './overlay/LoadingOverlay.vue';
  import PopupOverlay from './overlay/PopupOverlay.vue';

  export default {
    components: {
      Header,
      Login,
      LoadingOverlay,
      PopupOverlay
    },
    computed: {
      userIsLoggedIn() {
        return this.$store.getters.userIsLoggedIn;
      },
      contentIsBeingLoaded() {
        return this.$store.getters.contentIsBeingLoaded;
      },
      popupIsBeingShown() {
        return this.$store.getters.popupIsBeingShown;
      },
      popupContent() {
        return this.$store.getters.getPopupContent;
      }
    },
    created: function () {

      let contentLoadingName = 'checkIfSessionAlreadyExists';
      this.$store.dispatch('startContentLoading', contentLoadingName);

      getCurrentUser().then(data => {

        if(data.user !== null) {
          this.$store.dispatch('login', { username: data.user.name });
        }

        this.$store.dispatch('endContentLoading', contentLoadingName);

      }).catch(function(error) {
        console.log(error);
      });
    }
  }
</script>
