<template>
	<div class="profile-change-info">
		<v-dialog v-model="dialog" max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" text>изменить</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">Изменить данные профиля</span>
				</v-card-title>
				<v-card-text>
					<v-form v-model="isValid">
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="fullname"
										label="Полное имя"
										:rules="fullnameRules"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="about"
										label="О себе"
										counter="500"
										:rules="aboutRules"
									></v-text-field>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="website"
										label="Веб-сайт"
										hint="example.com"
									></v-text-field> </v-col
								><v-col cols="12" sm="6">
									<v-text-field
										v-model="location"
										label="Место жительства"
									></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="closeDialog">
						Отменить
					</v-btn>
					<v-btn
						color="blue darken-1"
						text
						:disabled="!isValid"
						@click="update"
					>
						Изменить
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: {
		fullnameProp: {
			type: String,
			required: true,
		},
		aboutProp: {
			type: String,
			required: true,
		},
		websiteProp: {
			type: String,
			required: true,
		},
		locationProp: {
			type: String,
			required: true,
		},
		idProp: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			dialog: false,
			isValid: false,
			fullname: '',
			about: '',
			website: '',
			location: '',
			fullnameRules: [
				(v) => !!v || 'Имя обязательно',
				(v) => v.length <= 40 || 'Слишком длинное имя',
				(v) => v.length >= 2 || 'Слишком короткое имя',
			],
			aboutRules: [(v) => v.length <= 500 || 'Слишком длинное описание'],
		};
	},
	methods: {
		closeDialog() {
			this.dialog = false;
		},
		update() {
			const data = {
				fullname: this.fullname,
				about: this.about,
				website: this.website,
				location: this.location,
				id: this.idProp,
			};
			this.$emit('update-user', data);
			this.dialog = false;
		},
	},
	mounted() {
		this.fullname = this.fullnameProp;
		this.about = this.aboutProp;
		this.website = this.websiteProp;
		this.location = this.locationProp;
	},
};
</script>

<style scoped></style>
