<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      mini-variant
      mini-variant-width="100"
      fixed
      app
      dark
      id="main-sidebar"
    >
      <!-- <v-img class="d-block" src="\logo.png" width="100" contain> </v-img> -->
      <v-list flat class="mt-2" dark>
        <v-list-item-group>
          <v-list-item
            v-for="(link, i) in items"
            :key="i"
            active-class="border"
            class="logout-border"
            :ripple="false"
            :to="link.to"
          >
            <v-list-item-content>
              <v-icon>{{ link.icon }}</v-icon>
              <v-list-item-subtitle align="center" class="mt-1 caption">{{
                link.title
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div
        style="
          position: absolute;
          bottom: 20px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
        "
      >
        <!-- <v-icon>mdi-logout</v-icon><br /><span class="caption">Logout</span> -->
        <v-list flat class="mt-4" dark>
          <v-list-item-group>
            <!-- <v-list-item
              class="logout-border"
              :ripple="false"
              @click="$auth.logout()"
            >
              <v-list-item-content>
                <v-icon>mdi-logout</v-icon>
                <v-list-item-subtitle align="center" class="mt-1 caption"
                  >Logout</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item> -->
            <v-list-item
              class="logout-border"
              :ripple="false"
              to="/admin/settings"
              exact
            >
              <v-list-item-content>
                <v-icon>mdi-cog</v-icon>
                <v-list-item-subtitle align="center" class="mt-1 caption"
                  >Settings</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevation="0"
     
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-avatar size="48" class="mr-3">
        <img src="/logo.png" alt="John" />
      </v-avatar>
     
      <v-toolbar-title class="text-headline-1">{{ title }}</v-toolbar-title>
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <!-- <span class="text-button">{{ this.$auth.user.cashier_name}}</span> -->
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn fab small v-on="on"  outlined>
            <v-avatar size="48">
              <!-- <span class="white--text text-h5">{{ user.initials }}</span> -->
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="green">
                <!-- <span class="white--text text-h5">{{ user.initials }}</span> -->
                <v-icon color="white">mdi-account</v-icon>
              </v-avatar>
              <h3 class="mt-3 mb-4">{{ this.$auth.user.cashier_name }}</h3>
              <span class="text-caption font-weight-bold"
                >Cashier No: {{ this.$auth.user.cashier_no }}</span
              >
              <p class="text-caption">
                {{ this.$auth.user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>
                <v-icon left>mdi-account</v-icon> Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="$auth.logout()">
                <v-icon left>mdi-logout</v-icon> Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['auth', 'isAdmin'],
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/admin',
        },
        
      ],
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SNC Queuing System',
    }
  },
}
</script>

<style scoped lang="scss">
.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding: 0 0 9x 8px;
  color: #fff;
}
// .v-avatar {
//   padding: 45px 0;
// }
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
}

.border {
  margin: 5px 8px 5px 8px;
  background: #4CAF50;
  border-radius: 10px;
  text-decoration: none;
}

.logout-border {
  margin: 5px 8px 5px 8px;
  border-radius: 10px;
  text-decoration: none;
}
.logout-border:hover {
  background: #4CAF50;
}
.v-list-item-group .v-list-item--active {
  color: white !important;
}
.theme--light.v-list-item--active .v-list-item__subtitle {
  color: white !important;
}
</style>
