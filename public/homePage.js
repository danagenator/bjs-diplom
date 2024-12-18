const logOutBtn = new LogoutButton();
logOutBtn.action = () => {
	ApiConnector.logout(callbackFn => {
		if (callbackFn.success) {
			location.reload();
		};
	})
};

ApiConnector.current(data => {
	if (data.success) {
		ProfileWidget.showProfile(data.data);
	}
});

const userRatesBoard = new RatesBoard();

function converting() {
	ApiConnector.getStocks(data => {
		if (data.success) {
			userRatesBoard.clearTable();
			userRatesBoard.fillTable(data.data);
		}
	})
}
converting();
setInterval(converting, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (callback) => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			moneyManager.setMessage(true, "Операция прошла успешно");
		} else {
			moneyManager.setMessage(false, "Не удалось пополнить баланс")
		}
	})
};

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (callback) => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			moneyManager.setMessage(true, "Успешно конвертировано");
		} else {
			moneyManager.setMessage(false, "Конвертация не удалась");
		}
	})
};

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (callback) => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			moneyManager.setMessage(true, "Выполнен перевод");
		} else {
			moneyManager.setMessage(false, "Перевод не удался");
		}
	})
};

const userFavouritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {
	if (callback.success) {
		userFavouritesWidget.clearTable();
		userFavouritesWidget.fillTable(callback.data);
		moneyManager.updateUsersList(callback.data)
	}
})

userFavouritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (callback) => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			userFavouritesWidget.setMessage(true, "Пользователь добавлен в список избранных");
		} else {
			userFavouritesWidget.setMessage(false, "Не удалось добавить пользователя. Проверьте правильность введенных данных.");
		}
	})
};


userFavouritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (callback) => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			userFavouritesWidget.setMessage(true, "Пользователь удален из списка избранных");
		} else {
			userFavouritesWidget.setMessage(false, "Не удалось удалить пользвателя из списка избранных");
		}
	})
};