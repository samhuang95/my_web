// npm i openapi-typescript -D
// npx openapi-typescript ${SWAGGER_API_JSON_PATH} -o ./src/types/swagger.type.ts

/**解析 swagger api 需給泛型(parseSwaggerApi<path>)
 * - 需要比較好的體驗可以改用固定解析
 * @returns
 * - parse() 動態解析
 * - parse2() 固定解析2層
 * - parse3() 固定解析3層
 * - parse4() 固定解析4層
 */
export function parseSwaggerApi<paths>() {
  /**固定解析 2 層 swagger api */
  function parse2<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Level2 extends keyof paths[ApiUrl][Method][Level1],
    Params extends paths[ApiUrl][Method][Level1][Level2]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    path2: Level2,
    params?: Params
  ) {
    return { url, method, params };
  }
  /**固定解析 3 層 swagger api */
  function parse3<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Level2 extends keyof paths[ApiUrl][Method][Level1],
    Level3 extends keyof paths[ApiUrl][Method][Level1][Level2],
    Params extends paths[ApiUrl][Method][Level1][Level2][Level3]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    path2: Level2,
    path3: Level3,
    params?: Params
  ) {
    return { url, method, params };
  }
  /**固定解析 4 層 swagger api */
  function parse4<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Level2 extends keyof paths[ApiUrl][Method][Level1],
    Level3 extends keyof paths[ApiUrl][Method][Level1][Level2],
    Level4 extends keyof paths[ApiUrl][Method][Level1][Level2][Level3],
    Params extends paths[ApiUrl][Method][Level1][Level2][Level3][Level4]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    path2: Level2,
    path3: Level3,
    path4: Level4,
    params?: Params
  ) {
    return { url, method, params };
  }

  function parse<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl]
  >(
    url: ApiUrl,
    method: Method
  ): { url: ApiUrl; method: Method; params?: undefined };

  function parse<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Params extends paths[ApiUrl][Method][Level1]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    params?: Params
  ): { url: ApiUrl; method: Method; params?: Params };

  function parse<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Level2 extends keyof paths[ApiUrl][Method][Level1],
    Params extends paths[ApiUrl][Method][Level1][Level2]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    path2: Level2,
    params?: Params
  ): { url: ApiUrl; method: Method; params?: Params };

  function parse<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Params extends paths[ApiUrl][Method][Level1]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    params?: Params
  ): { url: ApiUrl; method: Method; params?: Params };

  function parse<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Level2 extends keyof paths[ApiUrl][Method][Level1],
    Level3 extends keyof paths[ApiUrl][Method][Level1][Level2],
    Params extends paths[ApiUrl][Method][Level1][Level2][Level3]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    path2: Level2,
    path3: Level3,
    params?: Params
  ): { url: ApiUrl; method: Method; params?: Params };

  function parse<
    ApiUrl extends keyof paths,
    Method extends keyof paths[ApiUrl],
    Level1 extends keyof paths[ApiUrl][Method],
    Level2 extends keyof paths[ApiUrl][Method][Level1],
    Level3 extends keyof paths[ApiUrl][Method][Level1][Level2],
    Level4 extends keyof paths[ApiUrl][Method][Level1][Level2][Level3],
    Params extends paths[ApiUrl][Method][Level1][Level2][Level3][Level4]
  >(
    url: ApiUrl,
    method: Method,
    path1: Level1,
    path2: Level2,
    path3?: Level3,
    path4?: Level4,
    params?: Params
  ): { url: ApiUrl; method: Method; params?: Params };

  function parse(
    url: keyof any,
    method: any,
    ...args: any[]
  ): { url: any; method: any; params?: any } {
    const params = args[args.length - 1];
    return { url, method, params };
  }

  return {
    parse,
    parse2,
    parse3,
    parse4,
  };
}
