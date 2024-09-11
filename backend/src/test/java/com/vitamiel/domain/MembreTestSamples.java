package com.vitamiel.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MembreTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Membre getMembreSample1() {
        return new Membre().id(1L).livraisonAdress("livraisonAdress1").communicationPreference("communicationPreference1");
    }

    public static Membre getMembreSample2() {
        return new Membre().id(2L).livraisonAdress("livraisonAdress2").communicationPreference("communicationPreference2");
    }

    public static Membre getMembreRandomSampleGenerator() {
        return new Membre()
            .id(longCount.incrementAndGet())
            .livraisonAdress(UUID.randomUUID().toString())
            .communicationPreference(UUID.randomUUID().toString());
    }
}
