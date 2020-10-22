if ("workbox" in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}
/**
 * Webpack은 prod또는 dev:sw스크립트를 실행할 때만 ServiceWorker를 추가합니다 .
 *  워크 박스가로드되었는지 여부를 감지합니다.
 *  이 경우, 호출 precacheAndRoute로 self.__precacheManifest하는 빌드 스크립트에 의해 생성 된 자산의 배열입니다.
 *
 */
