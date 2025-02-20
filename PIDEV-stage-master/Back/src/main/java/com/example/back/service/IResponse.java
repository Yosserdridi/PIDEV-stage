package com.example.back.service;

import com.example.back.entities.Response;

import java.util.List;

public interface IResponse {
    Response addResponse(Response response);
    Response updateResponse(Response response);
    void deleteResponse(Long id);

    List<Response> getAllResponses();
}
