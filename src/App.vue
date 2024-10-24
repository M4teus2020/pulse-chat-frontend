<script setup lang="ts">
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
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.65 11.0645L13.1283 10.7253L14.3119 12.4216V17.6803L18.3698 14.2876V8.52002L16.5099 9.19856L14.65 11.0645Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M5.18078 11.0645L6.70251 10.7253L5.51894 12.4216V17.6803L1.46098 14.2876V8.52002L3.32088 9.19856L5.18078 11.0645Z"
                fill="var(--p-primary-color)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.02649 12.7634L7.37914 10.7278L8.22455 11.2367H11.6062L12.4516 10.7278L13.8042 12.7634V20.397L12.7898 21.9237L11.6062 23.1111H8.22455L7.04098 21.9237L6.02649 20.397V12.7634Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M14.311 20.9058L16.5091 18.7005V16.4952L14.311 18.3612V20.9058Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M5.51868 20.9058L3.32062 18.7005V16.4952L5.51868 18.3612V20.9058Z"
                fill="var(--p-primary-color)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.578 0.888672H7.7177L6.36505 4.11174L8.56311 10.5579H11.4375L13.4665 4.11174L12.1138 0.888672H10.2543V10.5578H9.578V0.888672Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M8.56283 10.5575L1.29232 7.84329L0.277832 3.60242L6.53385 4.11132L8.73191 10.5575H8.56283Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M11.4372 10.5575L18.7077 7.84329L19.7222 3.60242L13.2971 4.11132L11.2681 10.5575H11.4372Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M13.8041 3.60283L17.3548 3.26356L14.9876 0.888672H12.6205L13.8041 3.60283Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M6.02676 3.60283L2.47604 3.26356L4.84318 0.888672H7.21033L6.02676 3.60283Z"
                fill="var(--p-primary-color)"
              />
            </svg>
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
