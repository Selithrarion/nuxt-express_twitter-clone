<template>
	<v-col cols="12" md="6" class="main-page__right-side">
		<v-row class="mx-12">
			<v-col cols="12" md="5" class="hidden-sm-and-down">
				<v-text-field
					background-color="#f5f8fa"
					filled
					label="Почта, номер телефона"
				></v-text-field>
			</v-col>
			<v-col cols="12" md="5" class="hidden-sm-and-down">
				<v-text-field
					background-color="#f5f8fa"
					filled
					label="Пароль"
				></v-text-field>
			</v-col>
			<v-col
				cols="12"
				md="2"
				class="hidden-sm-and-down text-center align-center"
			>
				<v-btn class="mt-2" rounded outlined color="primary">Войти</v-btn>
			</v-col>
		</v-row>

		<v-row class="mt-8 mx-2" justify="center">
			<v-col cols="12" md="10">
				<v-icon x-large color="primary">mdi-twitter</v-icon>
				<h1 class="mt-4 mb-8">Узнайте, что происходит в мире прямо сейчас</h1>
				<h4 class="mt-8 mb-2">Присоединяйтесь к Твиттеру прямо сейчас!</h4>
				<v-dialog v-model="registerDialog" width="600">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" rounded block v-bind="attrs" v-on="on">
							Зарегистрироваться
						</v-btn>
					</template>

					<v-card>
						<v-card-text>
							<v-row class="pt-4">
								<v-icon
									class="main-page__register-dialog__twitter-icon"
									color="primary"
									>mdi-twitter</v-icon
								>
							</v-row>
						</v-card-text>
						<v-card-title class="text-h5">
							Создайте учётную запись
						</v-card-title>

						<v-card-text>
							<v-form v-model="registerValid">
								<v-text-field
									v-model="registerLogin"
									filled
									label="Логин"
									type="text"
									:rules="registerLoginRules"
									counter="50"
									background-color="#f5f8fa"
								></v-text-field>
								<v-text-field
									v-model="registerFullname"
									filled
									label="Полное имя"
									type="text"
									:rules="registerFullnameRules"
									counter="100"
									background-color="#f5f8fa"
								></v-text-field>
								<v-text-field
									v-model="registerEmail"
									filled
									label="Email"
									type="email"
									:rules="registerEmailRules"
									background-color="#f5f8fa"
								></v-text-field>
								<v-text-field
									v-model="registerPassword"
									filled
									label="Пароль"
									type="password"
									:rules="registerPasswordRules"
									background-color="#f5f8fa"
								></v-text-field>

								<p class="font-weight-bold">Дата рождения</p>
								<p>
									Эта информация не будет общедоступной. Подтвердите свой
									возраст, даже если эта учетная запись предназначена для
									компании, домашнего животного и т. д.
								</p>
								<v-row>
									<v-col cols="12" md="6">
										<v-select
											v-model="registerMonthSelected"
											:items="registerMonth"
											filled
											label="Месяц"
											background-color="#f5f8fa"
											append-icon="mdi-chevron-down"
										></v-select>
									</v-col>
									<v-col cols="12" md="3">
										<v-select
											v-model="registerDaySelected"
											:items="registerDay"
											filled
											label="День"
											background-color="#f5f8fa"
											append-icon="mdi-chevron-down"
										></v-select>
									</v-col>
									<v-col cols="12" md="3">
										<v-select
											v-model="registerYearSelected"
											:items="registerYear"
											filled
											label="Год"
											background-color="#f5f8fa"
											append-icon="mdi-chevron-down"
										></v-select>
									</v-col>
								</v-row>
								<v-btn
									color="primary"
									rounded
									block
									:disabled="!registerValid"
									:loading="isLoading"
									class="ml-auto"
									@click="tryToRegister"
									>Зарегистрироваться</v-btn
								>
							</v-form>
						</v-card-text>
					</v-card>
				</v-dialog>
				<v-btn
					class="mt-4"
					color="primary"
					rounded
					outlined
					block
					@click="$router.push('/login')"
					>Войти</v-btn
				>
			</v-col>
		</v-row>
		<BaseVSnackbar :is-visible="snackbarError" />
	</v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	layout: 'empty',
	data() {
		return {
			registerLogin: '',
			registerFullname: '',
			registerEmail: '',
			registerPassword: '',
			registerDialog: false,
			registerValid: false,
			isLoading: false,
			snackbarError: false,
			registerLoginRules: [
				(v) => !!v || 'Логин обязателен',
				(v) => v.length <= 50 || '',
			],
			registerFullnameRules: [
				(v) => !!v || 'Имя обязательно',
				(v) => v.length <= 100 || '',
			],
			registerEmailRules: [
				(v) =>
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					),
			],
			registerPasswordRules: [
				(v) => v.length >= 6 || 'Слишком короткий пароль',
			],
			registerMonthSelected: 'январь',
			registerDaySelected: 1,
			registerYearSelected: 2020,
			registerMonth: [
				'январь',
				'февраль',
				'март',
				'апрель',
				'май',
				'июнь',
				'июль',
				'август',
				'сентябрь',
				'октябрь',
				'ноябрь',
				'декабрь',
			],
			registerDay: [
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17,
				18,
				19,
				20,
				21,
				22,
				23,
				24,
				25,
				26,
				27,
				28,
				29,
				30,
				31,
			],
			registerYear: [
				2020,
				2019,
				2018,
				2017,
				2016,
				2015,
				2014,
				2013,
				2012,
				2011,
				2010,
				2009,
				2008,
				2007,
				2006,
				2005,
				2004,
				2003,
				2002,
				2001,
				2000,
				1999,
				1998,
				1997,
				1996,
				1995,
				1994,
				1993,
				1992,
				1991,
				1990,
				1989,
				1988,
				1987,
				1986,
				1985,
				1984,
				1983,
				1982,
				1981,
				1980,
				1979,
				1978,
				1977,
				1976,
				1975,
				1974,
				1973,
				1972,
				1971,
				1970,
				1969,
				1968,
				1967,
				1966,
				1965,
				1964,
				1963,
				1962,
				1961,
				1960,
				1959,
				1958,
				1957,
				1956,
				1955,
				1954,
				1953,
				1952,
				1951,
				1950,
				1949,
				1948,
				1947,
				1946,
				1945,
				1944,
				1943,
				1942,
				1941,
				1940,
				1939,
				1938,
				1937,
				1936,
				1935,
				1934,
				1933,
				1932,
				1931,
				1930,
				1929,
				1928,
				1927,
				1926,
				1925,
				1924,
				1923,
				1922,
				1921,
				1920,
				1919,
				1918,
				1917,
				1916,
				1915,
				1914,
				1913,
				1912,
				1911,
				1910,
				1909,
				1908,
				1907,
				1906,
				1905,
				1904,
				1903,
				1902,
				1901,
				1900,
			],
		};
	},
	methods: {
		...mapActions({
			register: 'register',
		}),
		async tryToRegister() {
			try {
				this.isLoading = true;
				const birthdayString =
					this.registerDaySelected +
					' ' +
					this.registerMonthSelected +
					' ' +
					this.registerYearSelected;
				const formData = {
					username: this.registerLogin,
					fullname: this.registerFullname,
					email: this.registerEmail,
					password: this.registerPassword,
					birthday: birthdayString,
				};
				await this.register(formData);
				this.registerDialog = false;
				this.$router.push('/login');
			} catch (err) {
				this.snackbarError = true;
				this.isLoading = false;
				console.error(err);
			}
		},
	},
};
</script>

<style scoped>
.main-page__right-side {
	height: calc(100vh - 78px);
}
.main-page__register-dialog__twitter-icon {
	position: absolute;
	left: 50%;
}
</style>
