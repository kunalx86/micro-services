#!/bin/sh
cd api-gateway && yarn dev &
cd auth && yarn dev &
cd user-info && yarn dev &