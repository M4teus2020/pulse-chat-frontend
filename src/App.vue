<script setup lang="ts">
import PrimeLogo from './components/icons/PrimeLogo.vue'
import { ref } from 'vue'

const isSlimMenu = ref(false)

const selectedSidebarNav = ref('Overview')
const SidebarNavs = [
  { icon: 'pi pi-home', title: 'Overview' },
  { icon: 'pi pi-comment', title: 'Chat' },
  { icon: 'pi pi-inbox', title: 'Inbox' },
  { icon: 'pi pi-th-large', title: 'Cards' },
  { icon: 'pi pi-user', title: 'Customers' },
  { icon: 'pi pi-video', title: 'Movies' },
]

const sidebarNavsMore = [{ icon: 'pi pi-cog', title: 'Settings' }]

function setSelectedSidebarNav(title: string) {
  selectedSidebarNav.value = title
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('p-dark')
}

function toggleSlimMenu() {
  isSlimMenu.value = !isSlimMenu.value
}
</script>

<template>
  <div
    class="flex h-screen w-full gap-6 bg-surface-0 p-4 dark:border-white/20 dark:bg-surface-950"
  >
    <div
      :class="isSlimMenu ? 'w-auto' : 'w-72'"
      class="flex h-full flex-col justify-between rounded-2xl bg-surface-50 p-5 dark:bg-surface-900"
    >
      <div :class="isSlimMenu ? 'flex w-12 flex-col items-center' : 'w-auto'">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-primary"
          >
            <PrimeLogo />
          </div>
          <div
            :class="isSlimMenu ? 'hidden' : 'block'"
            class="text-3xl font-medium text-surface-950 dark:text-surface-0"
          >
            Prime
          </div>
        </div>

        <div class="mt-10 flex flex-col gap-2">
          <div
            v-for="(navItem, index) in SidebarNavs"
            :key="index"
            v-tooltip="isSlimMenu ? navItem.title : null"
            @click="setSelectedSidebarNav(navItem.title)"
            class="flex cursor-pointer select-none items-center gap-1 rounded-lg px-4 py-1 text-base transition-all"
            :class="[
              {
                'w-12 justify-center py-4': isSlimMenu,
                'w-full': !isSlimMenu,
              },
              {
                'bg-transparent text-muted-color hover:bg-emphasis':
                  selectedSidebarNav !== navItem.title,
                'bg-primary text-primary-contrast hover:bg-primary-emphasis':
                  selectedSidebarNav === navItem.title,
              },
            ]"
          >
            <i :class="navItem.icon"></i>
            <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-8'"
              >・</span
            >
            <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-none'">{{
              navItem.title
            }}</span>
          </div>
        </div>
      </div>
      <div :class="isSlimMenu ? 'flex w-12 flex-col items-center' : 'w-auto'">
        <div class="mt-10 flex flex-col gap-2">
          <div
            v-tooltip="isSlimMenu ? 'Expanded Mode' : null"
            class="flex cursor-pointer select-none items-center gap-1 rounded-lg px-4 py-1 text-base transition-all text-muted-color hover:bg-emphasis"
            :class="[
              {
                'w-12 justify-center py-4': isSlimMenu,
                'w-full': !isSlimMenu,
              },
            ]"
            @click="toggleSlimMenu"
          >
            <a class="m-0 block cursor-pointer p-0 leading-none">
              <i
                :class="
                  isSlimMenu ? 'pi pi-window-maximize' : 'pi pi-window-minimize'
                "
              />
              <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-8'">
                ・
              </span>
              <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-none'">
                Slim Mode
              </span>
            </a>
          </div>

          <div
            v-for="(navItem, index) in sidebarNavsMore"
            :key="index"
            v-tooltip="isSlimMenu ? navItem.title : null"
            class="flex cursor-pointer select-none items-center gap-1 rounded-lg px-4 py-1 text-base transition-all"
            :class="[
              {
                'w-12 justify-center py-4': isSlimMenu,
                'w-full': !isSlimMenu,
              },
              {
                'bg-transparent text-muted-color hover:bg-emphasis':
                  selectedSidebarNav !== navItem.title,
                'bg-primary text-primary-contrast hover:bg-primary-emphasis':
                  selectedSidebarNav === navItem.title,
              },
            ]"
            @click="toggleDarkMode()"
          >
            <i :class="navItem.icon"></i>
            <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-8'"
              >・</span
            >
            <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-none'">{{
              navItem.title
            }}</span>
          </div>
        </div>
        <Divider />
        <div
          :class="isSlimMenu ? 'justify-center' : 'gap-3'"
          class="flex items-center"
        >
          <Avatar
            image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
            size="large"
            shape="circle"
            class="shrink-0"
          />
          <div>
            <div
              :class="
                isSlimMenu
                  ? 'hidden'
                  : 'text-base font-medium leading-5 text-color'
              "
            >
              Robin Jonas
            </div>
            <div
              :class="isSlimMenu ? 'hidden' : 'mt-1 text-sm text-muted-color'"
            >
              hi@robin.xyz
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
