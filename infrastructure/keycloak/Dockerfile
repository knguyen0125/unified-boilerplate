FROM quay.io/keycloak/keycloak:24.0.2

# Enable Health and Metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

ENV KC_DB=postgres

WORKDIR /opt/keycloak

# Additional customizations here

#ARG PHONE_PROVIDER_RELEASE="21.0.2_phone-2.3.3"
#ADD --chmod=0666 https://github.com/cooperlyt/keycloak-phone-provider/releases/download/${PHONE_PROVIDER_RELEASE}/keycloak-phone-provider.jar /opt/keycloak/providers/keycloak-phone-provider.jar
#ADD --chmod=0666 https://github.com/cooperlyt/keycloak-phone-provider/releases/download/${PHONE_PROVIDER_RELEASE}/keycloak-phone-provider.resources.jar /opt/keycloak/providers/keycloak-phone-provider.resources.jar
#ADD --chmod=0666 https://github.com/cooperlyt/keycloak-phone-provider/releases/download/${PHONE_PROVIDER_RELEASE}/keycloak-sms-provider-dummy.jar /opt/keycloak/providers/keycloak-sms-provider-dummy.jar
#ADD --chmod=0666 https://github.com/cooperlyt/keycloak-phone-provider/releases/download/${PHONE_PROVIDER_RELEASE}/keycloak-sms-provider-aws-sns.jar /opt/keycloak/providers/keycloak-sms-provider-aws-sns.jar
#ADD --chmod=0666 https://github.com/cooperlyt/keycloak-phone-provider/releases/download/${PHONE_PROVIDER_RELEASE}/keycloak-sms-provider-twilio.jar /opt/keycloak/providers/keycloak-sms-provider-twilio.jar

RUN /opt/keycloak/bin/kc.sh build --verbose

COPY ./themes/mytheme /opt/keycloak/themes/mytheme

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh" ]
