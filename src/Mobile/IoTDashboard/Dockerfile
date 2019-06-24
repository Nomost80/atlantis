FROM beevelop/ionic as base
WORKDIR /src/Mobile/IoTDashboard

FROM base as build
RUN npm install
RUN npm run build

FROM build as test
RUN npm run test
RUN npm run en2e
RUN npm run lint

FROM base as apk
RUN npm run install --only=prod
RUN npm run ionic cordova build android --prod --release
RUN npm run ionic cordova build ios --prod --release
