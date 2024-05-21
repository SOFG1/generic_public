# Genereic front

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Config Nginx for react-router-dom

1. Go to the /etc/nginx/sites-available folder on the server
2. Select the config file of our server
3. Change location setting to this.
```
location / {
    try_files $uri /index.html;
}
```
4. Run command sudo systemctl `reload nginx`

## Config Apache for react-router-dom

1. Create file in public folder `.htaccess`
2. Add to this file this code

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```



## How to implement responsive layout:

Верстка и определение размеров элементов в cms.stoi.co.

Макет нарисован шириной в 1920x1080 пикселей, если прописывать значения в пикселях элементы будут выглядеть слишком крупными на разрешениях 1100-1400 пикс.
Чтобы этого избежать размеры и прочие значения элементов для экранов шире 1250 css-пикселей используем vw вместо пикселей. Чтобы контент подстраивался в соответствии с шириной экрана. А на экранах узких чем 1250 css-пикселей используем статические размеры в пикселях. 

Пример верстки элемента из макета с размерами 200x200 с радиусом углов 30 пикс:

.element {
	height: 10.42vw;  // 200 / 19.20 = 10.42     делим на 19.20 потому что экран 1920px
	width: 10.42vw;
	border-radius: 1.56vw;	// 30 / 19.2 = 1.56
}

// на узких экранах делаем фиксированные размеры в соотношении 	1.53
@media screen and (max-width: 1250px) {
	height: 131px;	   		200 / 1.53 = 131
	width: 131px;			200 / 1.53 = 131
	border-radius: 20px;		30 / 1.53 = 20
}



PS
Число 1.53 - соотношение макета и минимального брейкпоинта 1920 / 1250 = 1.53
Чило 19.20 - 1vw от 1920 пикс(берем 1920 потому что это ширина макета)

Чтобы всегда вручную не делить пиксели на 19.20 и 1.53 можно воспользоваться vw калькулятором или написать его самому)

