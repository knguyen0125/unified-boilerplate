## Comment Introspection

To reduce redundancy, our backend enables comment introspection of NestJS CLI.

### Controller Method comment introspection

```ts
@Controller('/')
class APIController {
  /**
   * <Summary>
   *
   * @remarks
   *   <Description>
   * @deprecated
   */
  @Get()
  getHello() {}
}
```
