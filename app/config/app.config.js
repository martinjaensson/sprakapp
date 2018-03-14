exports.LOCAL = Object.assign({}, {
    api_url: "http://localhost:49887/",
    tokenRefreshInterval: 900000, // 15 min
    prodMode: false,
    dateFormat: 'YYYY-MM-DD HH:mm',
    tokenName: 'ex-token'
});

exports.PROD = Object.assign({}, {
    api_url: "https://plleagueapi.azurewebsites.net/",
    tokenRefreshInterval: 9000000, 
    prodMode: true,
    dateFormat: 'YYYY-MM-DD HH:mm',
    tokenName: 'ex-token'
});

