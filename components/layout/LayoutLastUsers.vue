<template>
	<div class="tags-and-recomendations">
		<v-list color="secondaryExtraExtraLightGray rounded-lg" flat>
			<span class="font-weight-black text-h6 px-2">
				Актуальные темы
			</span>

			<v-divider></v-divider>

			<v-list-item-group>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="font-weight-bold">
							Коронавирус
						</v-list-item-title>
						<v-list-item-subtitle>
							Твитов: 101 343
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="font-weight-bold">
							Выборы в США
						</v-list-item-title>
						<v-list-item-subtitle>
							Твитов: 25 634
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="font-weight-bold">
							#нюдсочетверг
						</v-list-item-title>
						<v-list-item-subtitle>
							Твитов: 1054
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
		<v-list color="secondaryExtraExtraLightGray rounded-lg mt-4" flat>
			<span class="font-weight-black text-h6 px-2"> Кого читать </span>

			<v-divider></v-divider>

			<v-list-item-group>
				<v-list-item>
					<v-list-item-avatar>
						<v-img
							src="https://images.unsplash.com/photo-1603610515737-193e0b423983?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1350&q=80"
						></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-bold">
							The New York Times
						</v-list-item-title>
						<v-list-item-subtitle> @nytimes </v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>