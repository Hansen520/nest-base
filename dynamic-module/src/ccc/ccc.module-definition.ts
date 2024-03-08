/*
 * @Date: 2024-03-08 17:09:18
 * @Description: description
 */
import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface CccModuleOptions {
  aaa: number;
  bbb: string;
}

// export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
//   new ConfigurableModuleBuilder<CccModuleOptions>().build();

// 这种就是全局的模式和上面对比来说的话
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<CccModuleOptions>()
  .setClassMethodName('register')
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      // 在原来的基础上多定义个isGlobal：
      global: extras.isGlobal,
    }),
  )
  .build();
