package com.demo;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Demo app - the point of this project is its outdated pom.xml, not this
 * file. Using log4j-core 2.14.1 directly is what makes this discoverable -
 * the exact version affected by Log4Shell (CVE-2021-44228).
 */
public class Main {
    private static final Logger log = LogManager.getLogger(Main.class);

    public static void main(String[] args) {
        log.info("Demo legacy service starting up");
    }
}
