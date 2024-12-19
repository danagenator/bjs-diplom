const logOutBtn = new LogoutButton();
logOutBtn.action = () => {
	ApiConnector.logout(response => {
		if (response.success) {
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
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Операция прошла успешно");
		} else {
			moneyManager.setMessage(false, response.error)
		}
	})
};

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Успешно конвертировано");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	})
};

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Выполнен перевод");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	})
};

const userFavouritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
	if (response.success) {
		userFavouritesWidget.clearTable();
		userFavouritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})

userFavouritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			userFavouritesWidget.clearTable();
			userFavouritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			userFavouritesWidget.setMessage(true, 'Пользователь добавлен в избранное');
		} else {
			userFavouritesWidget.setMessage(false, response.error);
		}
	})
};


userFavouritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			userFavouritesWidget.clearTable();
			userFavouritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			userFavouritesWidget.setMessage(true, 'Пользователь удален из избранного');
		} else {
			userFavouritesWidget.setMessage(false, response.error);
		}
	})
};