import { test as baseTest } from '@playwright/test';
import { SignupPage } from '../pom/SignupPage';
import { LoginPage } from '../pom/LoginPage';
import { Navbar } from '../pom/Navbar';
import { ProfilePage } from '../pom/ProfilePage';
import { MedicinesPage } from '../pom/MedicinesPage';
import { CartPage } from '../pom/CartPage';
import { CheckoutPage } from '../pom/CheckoutPage';
import { OrdersPage } from '../pom/OrdersPage';
import { AppointmentsPage } from '../pom/AppointmentsPage';
import { DoctorProfilePage } from '../pom/DoctorProfilePage';
import { AdminDashboardPage } from '../pom/AdminDashboardPage';
import { AdminDoctorsPage } from '../pom/AdminDoctorsPage';
import { AdminMedicinesPage } from '../pom/AdminMedicinesPage';
import { AdminOrdersPage } from '../pom/AdminOrdersPage';

export const test = baseTest.extend({
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  medicinesPage: async ({ page }, use) => {
    await use(new MedicinesPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },
  appointmentsPage: async ({ page }, use) => {
    await use(new AppointmentsPage(page));
  },
  doctorProfilePage: async ({ page }, use) => {
    await use(new DoctorProfilePage(page));
  },
  adminDashboardPage: async ({ page }, use) => {
    await use(new AdminDashboardPage(page));
  },
  adminDoctorsPage: async ({ page }, use) => {
    await use(new AdminDoctorsPage(page));
  },
  adminMedicinesPage: async ({ page }, use) => {
    await use(new AdminMedicinesPage(page));
  },
  adminOrdersPage: async ({ page }, use) => {
    await use(new AdminOrdersPage(page));
  },
});

export { expect } from '@playwright/test';
