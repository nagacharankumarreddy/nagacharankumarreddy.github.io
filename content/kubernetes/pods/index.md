# Pods

A Pod is the smallest deployable unit in Kubernetes — a group of one or more containers that share storage and network resources.

## Key Points

- Containers in the same Pod share the same IP address and port space.
- Pods are ephemeral; they're created and destroyed by higher-level controllers like Deployments.
- Each Pod gets its own IP address within the cluster network.

## Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
    - name: app
      image: nginx:latest
      ports:
        - containerPort: 80
```

> Pods are rarely created directly in production — use a Deployment or StatefulSet instead so Kubernetes can reschedule and heal them automatically.
