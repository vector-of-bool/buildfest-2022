package org.buildfest2022;

import io.micronaut.core.annotation.Creator;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.core.annotation.NonNull;
import org.bson.codecs.pojo.annotations.BsonCreator;
import org.bson.codecs.pojo.annotations.BsonProperty;

import javax.validation.constraints.NotBlank;

@Introspected
public class Document {
  @NonNull
  @NotBlank
  @BsonProperty("body")
  private final String body;

  @Creator
  @BsonCreator
  public Document(@NonNull @BsonProperty("body") String body) {
    this.body = body;
  }

  @NonNull
  public String getBody() {
    return body;
  }
}
