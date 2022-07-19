package com.runbhopalrun;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; // <= Add This Line
import android.os.Bundle; // <= Add This Line

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override                                             // <= Add This Line
  protected void onCreate(Bundle savedInstanceState) {  // <= Add This Line
    SplashScreen.show(this);                            // <= Add This Line
    super.onCreate(savedInstanceState);                 // <= Add This Line
  }                                                     // <= Add This Line

  @Override
  protected String getMainComponentName() {
    return "RunBhopalRun";
  }
}
