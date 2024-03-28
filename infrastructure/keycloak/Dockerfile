FROM quay.io/keycloak/keycloak:24.0.2

# Enable Health and Metrics support
ENV KC_HEALTH_ENABLED true
ENV KC_METRICS_ENABLED true

ENV KC_DB=postgres

WORKDIR /opt/keycloak

# Additional customizations here
RUN /opt/keycloak/bin/kc.sh build

COPY ./themes/mytheme /opt/keycloak/themes/mytheme

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh" ]
