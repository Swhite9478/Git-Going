# We will be using Python to build the Flask application
FROM python:3.6.8-alpine as base 

# Multi stage building! 
FROM base as builder

# This is where our requirements.txt will be taken care of 
RUN mkdir /install
WORKDIR /install

# Layer Caching to prevent needing to install everytime 
COPY requirements.txt /requirements.txt

RUN apk add -U --no-cache gcc build-base linux-headers ca-certificates python3-dev libffi-dev libressl-dev libxslt-dev

# Ensure our dependencies are installed (only when necessary)
RUN pip install --upgrade pip && \
pip install --install-option="--prefix=/install" -r /requirements.txt

FROM base

COPY --from=builder /install /usr/local

# Add everything from this directory to the /code/backend container directory  
ADD app/ /app

# Switch directories
WORKDIR /app

# We want to make sure we can access this port on the outside 
EXPOSE 5000

# Run the application 
CMD [ "python", "-u", "app.py" ]
