package com.pccompatibility.api.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CompatibilityController {

    @PostMapping("/check-compatibility")
    public Map<String, Object> checkCompatibility(@RequestBody Map<String, String> requestData) {
        String cpu = requestData.getOrDefault("cpu", "").toLowerCase();
        String gpu = requestData.getOrDefault("gpu", "").toLowerCase();
        String ram = requestData.getOrDefault("ram", "").toLowerCase();
        String motherboard = requestData.getOrDefault("motherboard", "").toLowerCase();
        String powerSupply = requestData.getOrDefault("powerSupply", "").toLowerCase();

        List<String> warnings = new ArrayList<>();

        // CPU & Motherboard Compatibility Check
        if (cpu.contains("lga 1700") && !motherboard.contains("lga 1700")) {
            warnings.add("Incompatible: CPU socket LGA 1700 requires an LGA 1700 motherboard.");
        }

        // RAM & Motherboard Compatibility Check
        if (ram.contains("ddr5") && !motherboard.contains("ddr5")) {
            warnings.add("Incompatible: DDR5 RAM is not supported by this motherboard.");
        }

        // GPU & Power Supply Compatibility Check
        if (gpu.contains("rtx 3090") && !powerSupply.contains("750w")) {
            warnings.add("Warning: RTX 3090 requires a 750W+ power supply.");
        }

        // Motherboard & GPU PCIe Slot Compatibility Check
        if (gpu.contains("pcie 4.0") && !motherboard.contains("pcie 4.0")) {
            warnings.add("Incompatible: This GPU requires PCIe 4.0, but the motherboard does not support it.");
        }

        // Final Compatibility Status
        boolean isCompatible = warnings.isEmpty();

        return Map.of(
                "isCompatible", isCompatible,
                "warnings", warnings
        );
    }
}
