import different.*;

public class Different {
    byte b       = 127;
    short s      = 6000;
    int i        = 20000;
    long l       = 40000;
    float f      = 1.22f;
    double d     = 2.24142;
    boolean bool = true;
    char c       = 127;

    different.Car car;
    Car anotherCar;
    Plane anotherPlane;
    
    public static void main(String[] args) {
        Different dif = new Different();
        dif.buyMilk();
        dif.goHome();
    }

    public void buyMilk() {
        System.out.println("Buy milk");
    }

    public void goHome() {
        System.out.println("Go home");
    }

    private Different method() {
        return new Different();
    }

    private int ia() {
        return this.i;
    }
};
