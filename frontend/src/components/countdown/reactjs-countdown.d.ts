declare module "reactjs-countdown" {
    import { ComponentType } from "react";

    interface CountDownProps {
        deadline: string;
    }

    const CountDown: ComponentType<CountDownProps>;

    export default CountDown;
}